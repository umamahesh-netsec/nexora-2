import './App.css'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Bell, CalendarDays, ChevronRight, CloudMoon, CloudSun, CloudRain, Droplets, Leaf, MapPin, Snowflake, Sun, Cpu, Eye, EyeOff,
  Fingerprint, Headphones, MessageCircle, Monitor, Moon,
  Network, Pause, Play, Power, Radio, RefreshCw, ShieldCheck, SkipBack,
  SkipForward, Smartphone, Thermometer, UserRound, Users, Wind, X,
  CheckCircle2, Clock3, Laptop, HardDrive, Wifi,
} from 'lucide-react'

type Category = 'Calendar' | 'Messages' | 'Reminders' | 'Devices' | 'Network'
type Notice = { title: string; body: string; time: string; icon: typeof CalendarDays }

const noticeItems: { name: Category; icon: typeof CalendarDays; count?: string }[] = [
  { name: 'Calendar', icon: CalendarDays, count: '2' },
  { name: 'Messages', icon: MessageCircle, count: '3' },
  { name: 'Reminders', icon: CheckCircle2 },
  { name: 'Devices', icon: Smartphone },
  { name: 'Network', icon: Network },
]

const notices: Record<Category, Notice[]> = {
  Calendar: [
    { title: 'Project focus session', body: 'NEXORA 2 interface refinement', time: 'Today · 4:30 PM', icon: CalendarDays },
    { title: 'Study block', body: 'Computer Networks revision', time: 'Today · 7:00 PM', icon: Clock3 },
  ],
  Messages: [
    { title: 'Workspace', body: 'Your next build is ready when you are.', time: '12 min ago', icon: MessageCircle },
    { title: 'Reminder bot', body: 'Take a short break between sessions.', time: '35 min ago', icon: Bell },
    { title: 'System', body: 'This is a sample notification.', time: '1 hr ago', icon: ShieldCheck },
  ],
  Reminders: [
    { title: 'Review daily priorities', body: 'A small, focused step is enough.', time: 'Today', icon: CheckCircle2 },
    { title: 'Back up your project', body: 'Keep a safe copy before major changes.', time: 'Tomorrow', icon: HardDrive },
  ],
  Devices: [
    { title: 'HP Notebook', body: 'This device · Local prototype', time: 'Connected', icon: Laptop },
    { title: 'Bluetooth audio', body: 'No live device connection available.', time: 'Demo status', icon: Headphones },
  ],
  Network: [
    { title: 'Network status', body: 'Connection state is not detected by this prototype.', time: 'Demo data', icon: Wifi },
    { title: 'Privacy', body: 'No network scan or system access is performed.', time: 'Local UI', icon: ShieldCheck },
  ],
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return now
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`glass-card ${className}`}>{children}</section>
}

function SectionHeading({ icon: Icon, title, meta }: { icon: typeof CloudSun; title: string; meta?: string }) {
  return (
    <div className="section-heading">
      <span className="section-icon"><Icon size={15} strokeWidth={1.7} /></span>
      <span>{title}</span>
      {meta && <span className="section-meta">{meta}</span>}
    </div>
  )
}

function MountainWallpaper() {
  return (
    <div className="wallpaper" aria-hidden="true">
      <div className="wallpaper-stars" />
      <div className="moon-halo"><div className="moon-shape" /></div>
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <svg className="mountain mountain-back" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
        <path d="M0 420 160 310 270 365 470 155 620 330 790 220 950 350 1110 190 1290 340 1440 245 1600 365V600H0Z" fill="#142b45" />
        <path d="m390 230 80-75 72 104-56-39-22 12-26-16Z M1040 270l70-80 69 91-54-35-19 10-23-15Z" fill="#a7bfd5" opacity=".34"/>
      </svg>
      <svg className="mountain mountain-front" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMax slice">
        <path d="M0 300 190 205 340 330 520 140 700 315 890 210 1070 355 1270 175 1435 300 1600 210V520H0Z" fill="#0a182a" />
        <path d="m438 205 82-65 78 90-62-39-22 11-23-12Z M1195 240l75-65 67 80-54-28-23 9-18-10Z" fill="#7897b7" opacity=".2"/>
      </svg>
      <div className="wallpaper-vignette" />
    </div>
  )
}

function WeatherCard() {
  const now = useClock()
  const hour = now.getHours()

  // Demo readings until a real weather API is connected.
  const temperature = 24
  const wind = 8
  const humidity = 64

  // Weather conditions take priority over the time of day.
  const isRainy = false
  const isSnowy = temperature <= 2
  const isCold = temperature > 2 && temperature <= 16

  let period = 'night'
  let label = 'Clear night'
  let background = 'weather-night'
  let WeatherIcon = CloudMoon

  if (isRainy) {
    period = 'rain'
    label = 'Rainy conditions'
    background = 'weather-rain'
    WeatherIcon = CloudRain
  } else if (isSnowy) {
    period = 'snow'
    label = 'Snow and freezing conditions'
    background = 'weather-snow'
    WeatherIcon = Snowflake
  } else if (isCold) {
    period = 'cold'
    label = 'Cool weather'
    background = 'weather-cold'
    WeatherIcon = Leaf
  } else if (hour >= 6 && hour < 10) {
    period = 'sunrise'
    label = 'Clear morning'
    background = 'weather-sunrise'
    WeatherIcon = Sun
  } else if (hour >= 10 && hour < 17) {
    period = 'midday'
    label = 'Sunny'
    background = 'weather-midday'
    WeatherIcon = Sun
  } else if (hour >= 17 && hour < 19) {
    period = 'sunset'
    label = 'Sunset'
    background = 'weather-sunset'
    WeatherIcon = CloudSun
  }

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <motion.section
      key={period}
      className={`weather-card-liquid ${background}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      aria-label="Weather overview"
    >
      <div className="weather-photo" aria-hidden="true" />
      <div className="weather-glass-shade" aria-hidden="true" />

      <header className="weather-liquid-header">
        <div className="weather-place">
          <MapPin size={15} strokeWidth={1.7} />
          <div>
            <strong>Davangere</strong>
            <span>Karnataka, India</span>
          </div>
        </div>
        <span className="weather-clock">{time}</span>
      </header>

      <div className="weather-liquid-main">
        <div>
          <div className="weather-temperature">
            <span>{temperature}°</span>
          </div>
          <div className="weather-condition">{label}</div>
        </div>
        <motion.div
          className="weather-condition-icon"
          animate={{ y: [0, -3, 0], rotate: period === 'sunrise' || period === 'midday' ? [0, 5, 0] : 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <WeatherIcon size={48} strokeWidth={1.25} />
        </motion.div>
      </div>

      <div className="weather-liquid-metrics">
        <div className="weather-metric">
          <Wind size={23} strokeWidth={1.5} />
          <div>
            <strong>{wind} <small>km/h</small></strong>
            <span>Wind speed</span>
          </div>
        </div>
        <div className="weather-metric">
          <Droplets size={23} strokeWidth={1.5} />
          <div>
            <strong>{humidity}<small>%</small></strong>
            <span>Humidity</span>
          </div>
        </div>
      </div>

      <footer className="weather-liquid-footer">
        <span className="weather-live-dot" />
        <span>WEATHER OVERVIEW</span>
        <span className="weather-period">{period.toUpperCase()}</span>
      </footer>
    </motion.section>
  )
}

function IdentityCard() {
  return (
    <GlassCard>
      <SectionHeading icon={Monitor} title="This device" />
      <div className="identity-row">
        <div className="os-mark"><span>N</span><i /></div>
        <div className="identity-copy"><strong>NEXORA OS</strong><span>Linux desktop concept</span></div>
        <span className="online-dot" title="Prototype running" />
      </div>
      <div className="identity-list">
        <div><span>Session</span><b>Local demo</b></div>
        <div><span>Environment</span><b>NEXORA Shell</b></div>
        <div><span>User</span><b>Mahesh</b></div>
      </div>
    </GlassCard>
  )
}

function MusicCard() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(36)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.12), 1000)
    return () => window.clearInterval(timer)
  }, [playing])
  return (
    <GlassCard className="music-card">
      <SectionHeading icon={Headphones} title="Now playing" meta="DEMO" />
      <div className="music-content">
        <div className="album-art" aria-label="Abstract album artwork"><div className="album-orb" /><div className="album-ring" /><span>N° 08</span></div>
        <div className="track-info"><strong>Midnight Signals</strong><span>Ambient Frequencies</span></div>
      </div>
      <div className="track-progress"><div style={{ width: `${progress}%` }} /></div>
      <div className="track-times"><span>{Math.floor(progress * 2.4 / 60)}:{String(Math.floor(progress * 2.4 % 60)).padStart(2, '0')}</span><span>04:00</span></div>
      <div className="music-controls">
        <button aria-label="Previous track" className="icon-button small" onClick={() => setProgress(0)}><SkipBack size={15}/></button>
        <motion.button whileTap={reduceMotion ? undefined : { scale: .92 }} aria-label={playing ? 'Pause music demo' : 'Play music demo'} className="play-button" onClick={() => setPlaying(p => !p)}>{playing ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}</motion.button>
        <button aria-label="Next track" className="icon-button small" onClick={() => setProgress(0)}><SkipForward size={15}/></button>
        <span className="demo-status">{playing ? 'Playing demo' : 'Playback paused'}</span>
      </div>
    </GlassCard>
  )
}

function CenterAuthCard({ now }: { now: Date }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [action, setAction] = useState('')

  const hour = now.getHours()
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 18 ? 'Good afternoon' : 'Good evening'

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(
      password
        ? 'Preview only — system authentication is not connected.'
        : 'Enter text to preview the interaction.'
    )
  }

  return (
    <div className="center-column center-apple">
      <div className="clock-block refined-clock">
        <div className="clock-time">
          {now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </div>

        <div className="clock-date">
          {now.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>

        <div className="clock-rule"><span /></div>
      </div>

      <div className="profile-block refined-profile">
        <div className="hex-frame">
          <div className="hex-inner">
            <UserRound size={34} strokeWidth={1.15} />
          </div>
          <span className="profile-status" />
        </div>

        <div className="profile-greeting">{greeting}</div>
        <h1>Mahesh<span>.</span></h1>
        <div className="profile-subtitle">
          Your personal space, ready when you are.
        </div>
      </div>

      <form className="unlock-form refined-unlock" onSubmit={submit}>
        <label htmlFor="demo-password">
          Password
          <span>DEMO ONLY</span>
        </label>

        <div className="password-field refined-password">
          <input
            id="demo-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setMessage('')
            }}
            placeholder="Enter password"
            autoComplete="off"
          />

          <button
            type="button"
            className="field-action"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(value => !value)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          <button
            type="submit"
            className="unlock-button refined-unlock-button"
            aria-label="Preview unlock interaction"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        {message && (
          <p className="form-message" role="status">{message}</p>
        )}

        <p className="security-note">
          <ShieldCheck size={12} />
          This prototype does not unlock your Linux session.
        </p>
      </form>

      <div className="session-controls refined-session">
        <button
          onClick={() => setAction('Sleep is a demonstration only.')}
        >
          <Moon size={16} /><span>Sleep</span>
        </button>

        <button
          onClick={() => setAction('Switch user is not connected to Linux accounts.')}
        >
          <Users size={16} /><span>Switch user</span>
        </button>

        <button
          onClick={() => setAction('Power controls are disabled in this prototype.')}
        >
          <Power size={16} /><span>Power</span>
        </button>
      </div>

      <AnimatePresence>
        {action && (
          <motion.div
            className="action-toast"
            role="status"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {action}
            <button
              onClick={() => setAction('')}
              aria-label="Dismiss message"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function Metric({ icon: Icon, label, value, percent, tint }: { icon: typeof Cpu; label: string; value: string; percent: number; tint: string }) {
  return <div className="metric">
    <div className="metric-top"><span className={`metric-icon ${tint}`}><Icon size={15}/></span><span className="metric-label">{label}</span><strong>{value}</strong></div>
    <div className="metric-track"><span className={tint} style={{ width: `${percent}%` }}/></div>
  </div>
}

function MetricsCard() {
  return (
    <GlassCard>
      <SectionHeading icon={Cpu} title="System overview" meta="MOCK" />
      <div className="metrics-list">
        <Metric icon={Cpu} label="CPU" value="18%" percent={18} tint="cyan"/>
        <Metric icon={Monitor} label="Memory" value="62%" percent={62} tint="violet"/>
        <Metric icon={Radio} label="GPU" value="12%" percent={12} tint="blue"/>
        <Metric icon={Thermometer} label="Temperature" value="46°C" percent={46} tint="amber"/>
      </div>
      <div className="metrics-foot"><span className="live-dot"/> Simulated system readings</div>
    </GlassCard>
  )
}

function NotificationCard({ onOpen }: { onOpen: (category: Category) => void }) {
  return (
    <GlassCard className="notification-card">
      <SectionHeading icon={Bell} title="Activity" meta="TODAY" />
      <div className="notification-list">
        {noticeItems.map(({ name, icon: Icon, count }) => (
          <button className="notification-row" key={name} onClick={() => onOpen(name)}>
            <span className="notification-icon"><Icon size={16}/></span>
            <span className="notification-label">{name}</span>
            {count && <span className="notification-count">{count}</span>}
            <ChevronRight size={14} className="notification-chevron"/>
          </button>
        ))}
      </div>
      <div className="notification-foot"><span className="tiny-dot"/> Local sample notifications</div>
    </GlassCard>
  )
}

function DetailPanel({ category, onClose }: { category: Category; onClose: () => void }) {
  const selected = noticeItems.find(item => item.name === category)!
  return (
    <motion.div className="detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="detail-panel"
        initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: .2 }}>
        <div className="detail-header"><div className="detail-heading-icon"><selected.icon size={18}/></div><div><h2 id="detail-title">{category}</h2><p>Personal overview · Sample data</p></div><button className="icon-button" onClick={onClose} aria-label="Close panel"><X size={18}/></button></div>
        <div className="detail-items">
          {notices[category].map((item, i) => <div className="detail-item" key={`${item.title}-${i}`}><span className="detail-item-icon"><item.icon size={16}/></span><div><strong>{item.title}</strong><p>{item.body}</p><span>{item.time}</span></div></div>)}
        </div>
        <div className="detail-disclaimer">This panel is a local UI demonstration. It does not read your messages, calendar, or connected devices.</div>
      </motion.section>
    </motion.div>
  )
}

export default function App() {
  const now = useClock()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  return (
    <main className="desktop-scene">
      <MountainWallpaper />
      <div className="ambient-grain" aria-hidden="true"/>
      <header className="brand-bar">
        <a className="brand" href="#" aria-label="NEXORA 2 home"><span className="brand-symbol">N</span><span>NEXORA <b>2</b></span></a>
        <div className="brand-center"><span className="status-pip"/> PERSONAL DESKTOP <span className="brand-divider">/</span> CONCEPT 01</div>
        <div className="brand-right"><span className="local-indicator"><span/> LOCAL DEMO</span><span className="brand-version">v0.1</span></div>
      </header>
      <div className="dashboard-wrap">
        <section className="dashboard-window" aria-label="NEXORA 2 lock-screen prototype">
          <aside className="side-column left-column">
            <WeatherCard />
            <IdentityCard />
            <MusicCard />
          </aside>
          <CenterAuthCard now={now}/>
          <aside className="side-column right-column">
            <MetricsCard />
            <NotificationCard onOpen={setActiveCategory}/>
            <div className="privacy-foot"><Fingerprint size={13}/> Private by design <span>·</span> Demo interface</div>
          </aside>
          <div className="window-footer"><span><span className="footer-dot"/> NEXORA SESSION</span><span>DESIGNED FOR QUIET FOCUS</span><span>LOCAL · NO SYSTEM ACCESS</span></div>
        </section>
      </div>
      <footer className="desktop-footer"><span>© 2026 NEXORA PROJECT</span><span>MADE FOR YOUR OWN DIGITAL SPACE</span><span><RefreshCw size={11}/> INTERFACE PREVIEW</span></footer>
      <AnimatePresence>{activeCategory && <DetailPanel category={activeCategory} onClose={() => setActiveCategory(null)}/>}</AnimatePresence>
    </main>
  )
}
