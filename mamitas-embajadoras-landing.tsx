import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Flame,
  Gift,
  Heart,
  Medal,
  MessageCircle,
  Paintbrush,
  Palette,
  PartyPopper,
  Pencil,
  Shapes,
  Sparkles,
  Star,
  TimerReset,
  Trophy,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const WHATSAPP_PHONE = "573001112233";

const leaderboardSeed = [
  { id: 1, name: "Laura", points: 38, children: 8, badge: "Arrancando fuerte" },
  { id: 2, name: "Mariana", points: 33, children: 7, badge: "En movimiento" },
  { id: 3, name: "Sofía", points: 29, children: 5, badge: "Súper mamá" },
  { id: 4, name: "Valentina", points: 24, children: 4, badge: "Subiendo" },
  { id: 5, name: "Daniela", points: 21, children: 3, badge: "Embajadora" },
];

const perks = [
  {
    icon: Crown,
    title: "Beca completa",
    text: "La mamita que más artistas traiga gana una beca completa para su hijo en Arte Joven.",
    splash: "from-yellow-300 to-orange-400",
  },
  {
    icon: Gift,
    title: "Kits de pintura",
    text: "Premios extra con pinceles, pinturas, lienzos y sorpresas creativas para seguir soñando en grande.",
    splash: "from-pink-300 to-red-400",
  },
  {
    icon: Sparkles,
    title: "Experiencias artísticas",
    text: "Talleres VIP con materiales premium y actividades guiadas para una experiencia inolvidable.",
    splash: "from-sky-300 to-cyan-400",
  },
  {
    icon: Heart,
    title: "Comunidad VIP",
    text: "Acceso anticipado, beneficios exclusivos y prioridad en próximos vacacionales.",
    splash: "from-lime-300 to-emerald-400",
  },
];

const activities = [
  {
    title: "Dibujo",
    description: "Trazos, personajes, ideas y creatividad desde la primera línea.",
    icon: Pencil,
    blob: "bg-yellow-300",
    rotate: "rotate-[-2deg]",
  },
  {
    title: "Pintura",
    description: "Color, emoción y libertad para crear obras llenas de vida.",
    icon: Paintbrush,
    blob: "bg-sky-300",
    rotate: "rotate-[2deg]",
  },
  {
    title: "Escultura",
    description: "Formas, volumen y manos en acción convirtiendo ideas en arte real.",
    icon: Shapes,
    blob: "bg-pink-300",
    rotate: "rotate-[-1deg]",
  },
];

const pricing = [
  { kids: "3 niños", price: "$1.000.000", note: "Ideal para un mini grupo creativo" },
  { kids: "4 niños", price: "$1.200.000", note: "Más amigos, más emoción" },
  { kids: "5 niños", price: "$1.500.000", note: "Grupo grande, energía total" },
];

const referralTiers = [
  {
    level: "Nivel 1",
    goal: "1 artista inscrito",
    reward: "Bono de materiales (valor $50.000)",
    bg: "bg-yellow-100",
  },
  {
    level: "Nivel 2",
    goal: "2 artistas inscritos",
    reward: "10% descuento + acceso comunidad VIP",
    bg: "bg-sky-100",
  },
  {
    level: "Nivel 3",
    goal: "3+ artistas inscritos",
    reward: "Entra al sorteo de beca completa",
    bg: "bg-pink-100",
  },
];

const faqs = [
  {
    q: "¿Qué edades pueden participar?",
    a: "Niños de 5 a 14 años, separados por grupos de edad para que aprendan a su ritmo.",
  },
  {
    q: "¿Incluye materiales?",
    a: "Sí. Incluye materiales base de dibujo, pintura y escultura durante las sesiones.",
  },
  {
    q: "¿Cómo gano puntos como embajadora?",
    a: "Cada niño inscrito con tu link o código suma puntos en tu tablero de ranking en tiempo real.",
  },
  {
    q: "¿Puedo pagar por cuotas?",
    a: "Sí, manejamos separación de cupo y plan de pago según el grupo de niños que armes.",
  },
];

const confetti = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${(i * 5.2) % 100}%`,
  top: `${(i * 13.7) % 100}%`,
  rotate: `${(i * 37) % 360}deg`,
  delay: i * 0.12,
}));

const countdownTarget = new Date(Date.now() + 1000 * 60 * 60 * 48);

function getTimeLeft() {
  const distance = countdownTarget.getTime() - Date.now();
  if (distance <= 0) return "Oferta termina hoy";
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m`;
}

function trackEvent(eventName: string, payload?: Record<string, string>) {
  if (typeof window !== "undefined") {
    console.info("[tracking]", eventName, payload ?? {});
  }
}

export default function MamitasEmbajadorasLanding() {
  const [leaderboard, setLeaderboard] = useState(leaderboardSeed);
  const [pulseId, setPulseId] = useState<number | null>(2);
  const [liveMessage, setLiveMessage] = useState("Mariana acaba de sumar 1 artista y subió en el ranking 🔥");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [formData, setFormData] = useState({ momName: "", childName: "", age: "", phone: "" });

  useEffect(() => {
    const messages = [
      "Mariana acaba de sumar 1 artista y subió en el ranking 🔥",
      "Valentina está a 2 artistas del TOP 3 ✨",
      "Laura sigue liderando la misión creativa 💖",
      "Una nueva mamita embajadora acaba de entrar al tablero 🎉",
    ];

    const interval = setInterval(() => {
      setLeaderboard((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = {
          ...next[idx],
          points: next[idx].points + 1,
          children: next[idx].children + (Math.random() > 0.6 ? 1 : 0),
        };
        next.sort((a, b) => b.points - a.points);
        setPulseId(next.find((mom) => mom.id === next[idx].id)?.id ?? null);
        setLiveMessage(messages[Math.floor(Math.random() * messages.length)]);
        return next;
      });
    }, 2800);

    const countdown = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000 * 30);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  const topThree = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
  const currentUserProgress = 72;
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hola, quiero participar en Mamitas Embajadoras y recibir mi link de referidos."
  )}`;

  const submitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("lead_form_submit", { channel: "hero_form" });
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff9f2] pb-24 text-slate-900 md:pb-0">
      <section className="sticky top-0 z-50 border-b-4 border-slate-900 bg-[#111827] px-4 py-2 text-center text-sm font-black text-white">
        <span className="inline-flex items-center gap-2">
          <TimerReset className="h-4 w-4" /> Bono de lanzamiento termina en: {timeLeft}
        </span>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,203,5,0.28),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(0,174,239,0.24),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(255,0,0,0.16),_transparent_24%)]" />

        <div className="pointer-events-none absolute inset-0">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, 10, 0], rotate: [c.rotate, `calc(${c.rotate} + 12deg)`, c.rotate] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: c.delay }}
              className="absolute h-4 w-10 rounded-full"
              style={{
                left: c.left,
                top: c.top,
                background: c.id % 4 === 0 ? "#ff0000" : c.id % 4 === 1 ? "#00AEEF" : c.id % 4 === 2 ? "#FFCB05" : "#22c55e",
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 rounded-[1.4rem] border-4 border-slate-900 bg-white px-5 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <PartyPopper className="h-6 w-6" />
                <span className="text-base font-black uppercase tracking-wide md:text-xl">Vacacional de mitad de año · Arte Joven</span>
              </motion.div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                <span className="inline-block rounded-3xl bg-[#FFCB05] px-4 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Mamitas</span>{" "}
                <span className="inline-block rotate-[-2deg] rounded-3xl bg-[#ff4d6d] px-4 py-2 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Embajadoras</span>
                <br />
                <span className="mt-3 inline-block rounded-3xl bg-[#00AEEF] px-4 py-2 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">del Arte</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold text-slate-700 md:text-2xl">
                Convierte este vacacional en una aventura creativa para tu hijo y en una competencia emocionante para ti.
                <span className="font-black text-[#ff0000]"> Arma tu grupo, sube en el ranking y gana premios increíbles.</span>
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() => {
                    trackEvent("cta_click", { cta: "hero_whatsapp" });
                    window.open(whatsappHref, "_blank", "noopener,noreferrer");
                  }}
                  className="h-14 rounded-2xl border-4 border-slate-900 bg-[#ff0000] px-8 text-lg font-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e50000]"
                >
                  Inscribirme por WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    trackEvent("cta_click", { cta: "hero_referral_link" });
                    window.open(whatsappHref, "_blank", "noopener,noreferrer");
                  }}
                  className="h-14 rounded-2xl border-4 border-slate-900 bg-white px-8 text-lg font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fff1f1]"
                >
                  Quiero mi link embajadora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <Card className="mt-8 rounded-[1.6rem] border-4 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-5">
                  <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-600">Reserva tu cupo en 30 segundos</p>
                  <form className="grid gap-3 md:grid-cols-2" onSubmit={submitLeadForm}>
                    <Input
                      required
                      placeholder="Nombre de mamá"
                      value={formData.momName}
                      onChange={(e) => setFormData((s) => ({ ...s, momName: e.target.value }))}
                    />
                    <Input
                      required
                      placeholder="Nombre del niño"
                      value={formData.childName}
                      onChange={(e) => setFormData((s) => ({ ...s, childName: e.target.value }))}
                    />
                    <Input
                      required
                      placeholder="Edad"
                      value={formData.age}
                      onChange={(e) => setFormData((s) => ({ ...s, age: e.target.value }))}
                    />
                    <Input
                      required
                      placeholder="WhatsApp"
                      value={formData.phone}
                      onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))}
                    />
                    <Button type="submit" className="md:col-span-2 h-12 rounded-xl border-4 border-slate-900 bg-[#111827] text-base font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      Quiero separar cupo y recibir mi link
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card className="relative overflow-hidden rounded-[2rem] border-4 border-slate-900 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute right-3 top-3 rounded-full border-4 border-slate-900 bg-[#FFCB05] px-4 py-1 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                En tiempo real
              </div>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl border-4 border-slate-900 bg-[#ff4d6d] p-3 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Dashboard de Mamitas</h2>
                    <p className="text-sm font-semibold text-slate-600">Así se mueve la misión creativa ahora mismo</p>
                  </div>
                </div>

                <motion.div
                  key={liveMessage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-2xl border-4 border-slate-900 bg-[#f0fbff] p-4 text-sm font-black text-slate-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Flame className="h-4 w-4 text-[#ff0000]" /> {liveMessage}
                  </span>
                </motion.div>

                <div className="space-y-3">
                  {leaderboard.map((mom, index) => (
                    <motion.div
                      key={mom.id}
                      animate={pulseId === mom.id ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className={`rounded-2xl border-4 border-slate-900 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${
                        index === 0 ? "bg-[#fff2b8]" : index === 1 ? "bg-[#e7f8ff]" : index === 2 ? "bg-[#ffe2ea]" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-slate-900 bg-white text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-lg font-black">
                              {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                              {index > 0 && index < 3 && <Medal className="h-5 w-5 text-sky-500" />}
                              {mom.name}
                            </div>
                            <div className="text-sm font-bold text-slate-600">
                              {mom.badge} · {mom.children} artistas
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black">{mom.points}</div>
                          <div className="text-xs font-bold uppercase text-slate-500">puntos</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border-4 border-slate-900 bg-[#f6fff0] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide text-slate-600">Tu avance</p>
                      <h3 className="text-xl font-black">Estás a 1 referido de entrar al TOP 3</h3>
                    </div>
                    <Star className="h-8 w-8 text-[#ff0000]" />
                  </div>
                  <Progress value={currentUserProgress} className="mt-3 h-4 border-2 border-slate-900 bg-white" />
                  <p className="mt-2 text-sm font-bold text-slate-600">{currentUserProgress}% completado · ¡Estás muy cerca!</p>
                </div>

                <div className="mt-4 rounded-xl border-4 border-slate-900 bg-[#111827] p-3 text-white">
                  <p className="text-xs font-black uppercase">Top 3 actual</p>
                  <p className="mt-1 text-sm font-semibold">{topThree.map((m) => m.name).join(" · ")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Card className="h-full rounded-[2rem] border-4 border-slate-900 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-6">
                    <div className={`inline-flex rounded-2xl border-4 border-slate-900 bg-gradient-to-br ${perk.splash} p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-2xl font-black">{perk.title}</h3>
                    <p className="mt-2 text-base font-semibold text-slate-700">{perk.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-slate-900 bg-[#00AEEF] px-4 py-2 text-sm font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Users className="h-4 w-4" /> Plan de referidos por niveles
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {referralTiers.map((tier) => (
            <Card key={tier.level} className={`rounded-[1.7rem] border-4 border-slate-900 ${tier.bg} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
              <CardContent className="p-6">
                <p className="text-sm font-black uppercase text-slate-600">{tier.level}</p>
                <h3 className="mt-2 text-2xl font-black">{tier.goal}</h3>
                <p className="mt-3 text-base font-semibold text-slate-700">{tier.reward}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-4 border-slate-900 bg-[#FFCB05] px-4 py-2 text-sm font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Palette className="h-4 w-4" /> Vacacional creativo
            </div>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Lo que vivirán tus pequeños artistas</h2>
          </div>
          <p className="max-w-xl text-lg font-semibold text-slate-700">
            Aquí no vienen a matar el tiempo. Vienen a crear, explorar y salir con una sonrisa que casi necesita marco.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {activities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={activity.rotate}
              >
                <Card className="overflow-hidden rounded-[2rem] border-4 border-slate-900 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <div className={`h-28 ${activity.blob} border-b-4 border-slate-900`} />
                  <CardContent className="relative p-6">
                    <div className="-mt-16 inline-flex rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-3xl font-black">{activity.title}</h3>
                    <p className="mt-2 text-base font-semibold text-slate-700">{activity.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border-4 border-slate-900 bg-[#fff2f2] px-4 py-2 text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <CheckCircle2 className="h-4 w-4" /> Materiales incluidos
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[2rem] border-4 border-slate-900 bg-[#111827] text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-7">
              <div className="inline-flex items-center gap-2 rounded-full border-4 border-white bg-[#ff0000] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,0.25)]">
                <Users className="h-4 w-4" /> Cómo funciona
              </div>
              <h2 className="mt-5 text-4xl font-black">Tu misión creativa en 4 pasos</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Te registras como Mamita Embajadora del Arte.",
                  "Recibes tu link/código de referido para compartir.",
                  "Cada artista inscrito suma puntos en tu tablero.",
                  "Subes en el ranking y desbloqueas premios.",
                ].map((step, i) => (
                  <div key={step} className="flex gap-3 rounded-2xl border-4 border-white/90 bg-white/10 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#FFCB05] text-lg font-black text-slate-900">
                      {i + 1}
                    </div>
                    <p className="text-base font-semibold text-white/95">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-4 border-slate-900 bg-[#00AEEF] px-4 py-2 text-sm font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <TimerReset className="h-4 w-4" /> Precios por grupo
            </div>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Ven con tu grupo y recibe grandes descuentos</h2>
            <p className="mt-3 max-w-2xl text-lg font-semibold text-slate-700">
              Mientras más amigas se animan, más poderosa se vuelve la experiencia. Aquí todos ganan: los niños comparten, crean y tú entras en la carrera por los premios.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {pricing.map((item, i) => (
                <Card key={item.kids} className="h-full rounded-[2rem] border-4 border-slate-900 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex rounded-2xl border-4 border-slate-900 px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        i === 0 ? "bg-[#FFCB05]" : i === 1 ? "bg-[#c7f0ff]" : "bg-[#ffd1dc]"
                      }`}
                    >
                      {item.kids}
                    </div>
                    <div className="mt-5 text-4xl font-black">{item.price}</div>
                    <p className="mt-2 text-base font-semibold text-slate-700">{item.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Card className="rounded-[2rem] border-4 border-slate-900 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8">
            <h3 className="text-3xl font-black">Preguntas frecuentes</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-2xl border-4 border-slate-900 bg-[#fffdf8] p-4">
                  <p className="font-black">{item.q}</p>
                  <p className="mt-2 font-semibold text-slate-700">{item.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-[2.5rem] border-4 border-slate-900 bg-[linear-gradient(135deg,#ff0000_0%,#ff4d6d_35%,#00AEEF_100%)] p-8 text-white shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-4 border-white bg-white/10 px-4 py-2 text-sm font-black uppercase">
                <Sparkles className="h-4 w-4" /> Comunidad VIP Arte Joven
              </div>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] md:text-6xl">No solo inscribes a tu hijo. Entras a algo grande.</h2>
              <p className="mt-5 max-w-3xl text-lg font-semibold text-white/95 md:text-xl">
                Ranking en vivo, premios, emoción y una comunidad que se mueve con amor y creatividad.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => window.open(whatsappHref, "_blank", "noopener,noreferrer")}
                className="h-16 rounded-2xl border-4 border-slate-900 bg-[#FFCB05] px-8 text-lg font-black text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffd739]"
              >
                Quiero entrar al ranking
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(whatsappHref, "_blank", "noopener,noreferrer")}
                className="h-16 rounded-2xl border-4 border-white bg-white/10 px-8 text-lg font-black text-white hover:bg-white/20"
              >
                Quiero armar mi grupo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-10">
        <div className="flex flex-col gap-4 rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-3xl font-black tracking-tight">
              <span className="text-[#ff0000]">ARTE</span> <span className="text-[#00AEEF]">JOVEN</span>
            </div>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-slate-600">Enseñamos con amor</p>
          </div>
          <div className="text-sm font-semibold text-slate-600">Landing optimizada para conversión, referidos y crecimiento sostenido.</div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-slate-900 bg-white p-3 md:hidden">
        <Button
          onClick={() => {
            trackEvent("cta_click", { cta: "sticky_mobile" });
            window.open(whatsappHref, "_blank", "noopener,noreferrer");
          }}
          className="h-12 w-full rounded-xl border-4 border-slate-900 bg-[#ff0000] text-base font-black text-white"
        >
          Separar cupo ahora
        </Button>
      </div>
    </div>
  );
}
