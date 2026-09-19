// Live clock, calendar, and weather gadgets (top-right stack).
// Weather comes from Open-Meteo's free public API (no key needed),
// fixed to Miami coordinates, refreshed every 15 minutes. The icon
// reflects the real current condition (WMO weather code), not just a
// fixed sun graphic.
(function () {
  function updateGadgets() {
    const now = new Date();
    const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const h = est.getHours() % 12;
    const m = est.getMinutes();
    const s = est.getSeconds();
    const hourDeg = (h + m / 60) * 30;
    const minDeg = (m + s / 60) * 6;
    const secDeg = s * 6;
    document.querySelectorAll('.clock-hour').forEach(el => el.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`);
    document.querySelectorAll('.clock-min').forEach(el => el.style.transform = `translateX(-50%) rotate(${minDeg}deg)`);
    document.querySelectorAll('.clock-sec').forEach(el => el.style.transform = `translateX(-50%) rotate(${secDeg}deg)`);
    const dayName = est.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    const monthYear = est.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    document.querySelectorAll('.cal-day').forEach(el => el.textContent = dayName);
    document.querySelectorAll('.cal-date').forEach(el => el.textContent = est.getDate());
    document.querySelectorAll('.cal-month').forEach(el => el.textContent = monthYear);
  }
  updateGadgets();
  setInterval(updateGadgets, 1000);

  // Simple original weather-condition icons keyed by WMO weather code
  // ranges (see Open-Meteo docs) — not copied from any icon set.
  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" stroke="#f5b942" stroke-width="2" stroke-linecap="round" fill="none"><circle cx="12" cy="12" r="5" fill="#f5b942" stroke="none"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></svg>',
    cloud: '<svg viewBox="0 0 24 24"><path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 8.1 4.5 4.5 0 0 1 17.5 17H7z" fill="#e8f0f7" stroke="#c3d3e0" stroke-width="1"/></svg>',
    rain: '<svg viewBox="0 0 24 24"><path d="M7 14a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 4.1 4.5 4.5 0 0 1 17.5 13H7z" fill="#dbe6f0" stroke="#b7c9db" stroke-width="1"/><g stroke="#7fb0e0" stroke-width="1.8" stroke-linecap="round"><line x1="8" y1="17" x2="7" y2="21"/><line x1="12" y1="17" x2="11" y2="21"/><line x1="16" y1="17" x2="15" y2="21"/></g></svg>',
    storm: '<svg viewBox="0 0 24 24"><path d="M7 13a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 3.1 4.5 4.5 0 0 1 17.5 12H7z" fill="#c9d6e3" stroke="#a3b6c9" stroke-width="1"/><path d="M13 12l-3 5h3l-2 5 5-7h-3z" fill="#f5c542"/></svg>',
    snow: '<svg viewBox="0 0 24 24"><path d="M7 14a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 4.1 4.5 4.5 0 0 1 17.5 13H7z" fill="#eef4fa" stroke="#c3d3e0" stroke-width="1"/><g stroke="#bcd6ef" stroke-width="1.6" stroke-linecap="round"><line x1="8" y1="17" x2="8" y2="21"/><line x1="6" y1="19" x2="10" y2="19"/><line x1="16" y1="17" x2="16" y2="21"/><line x1="14" y1="19" x2="18" y2="19"/></g></svg>',
    fog: '<svg viewBox="0 0 24 24" stroke="#c3d3e0" stroke-width="2" stroke-linecap="round" fill="none"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="4" y1="19" x2="20" y2="19"/></svg>'
  };

  function iconForCode(code) {
    if (code === 0) return ICONS.sun;
    if (code >= 1 && code <= 3) return ICONS.cloud;
    if (code === 45 || code === 48) return ICONS.fog;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return ICONS.rain;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return ICONS.snow;
    if (code >= 95 && code <= 99) return ICONS.storm;
    return ICONS.sun;
  }

  async function updateWeather() {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=25.7617&longitude=-80.1918&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York',
        { cache: 'no-store' }
      );
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const icon = iconForCode(data.current.weather_code);
      document.querySelectorAll('.weather-temp').forEach(el => el.textContent = temp + '°F');
      document.querySelectorAll('.weather-icon').forEach(el => el.innerHTML = icon);
    } catch (e) {
      document.querySelectorAll('.weather-temp').forEach(el => el.textContent = '--°F');
    }
  }
  updateWeather();
  setInterval(updateWeather, 900000);
})();
