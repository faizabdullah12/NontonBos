import { NavLink } from 'react-router-dom';

// Tab untuk nested route (setiap tab = URL berbeda)
export default function Tabs({ tabs }) {
  return (
    <div className="flex gap-space-xs overflow-x-auto rounded-xl bg-surface-container-low p-1.5" role="tablist">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end}
          className={({ isActive }) =>
            `flex items-center gap-space-xs whitespace-nowrap rounded-lg px-space-md py-space-sm text-label-lg transition ${
              isActive ? 'bg-primary font-bold text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
          <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
