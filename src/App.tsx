import { useState, useMemo } from 'react';
import { DISTRICTS, TOTAL_POPULATION, TOTAL_AREA, type District } from './data';
import { DISTRICT_PATHS } from './mapPaths';

function formatPop(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + ' млн';
  if (n >= 1000) return (n / 1000).toFixed(1) + ' мий';
  return String(n);
}

function formatArea(n: number): string {
  return n.toLocaleString('ru') + ' км²';
}

// Sidebar district info panel
function DistrictPanel({ district }: { district: District }) {
  return (
    <div className="district-info">
      <div className="district-info-header">
        <div className="district-info-coat">{district.coat}</div>
        <div className="district-info-name">{district.name}</div>
        <div className="district-info-name-ro">{district.nameRo} · {district.nameRu}</div>
        <div className="district-info-desc">{district.description}</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Популацие</div>
          <div className="stat-card-value">
            {formatPop(district.population)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Супрафацэ</div>
          <div className="stat-card-value">
            {district.area.toLocaleString()}<span className="stat-card-unit">км²</span>
          </div>
        </div>
      </div>

      <div className="info-row">
        <span className="info-row-label">Чентру административ</span>
        <span className="info-row-value">{district.capital}</span>
      </div>
      <div className="info-row">
        <span className="info-row-label">Denumire română</span>
        <span className="info-row-value">{district.capitalRo}</span>
      </div>
      <div className="info-row">
        <span className="info-row-label">Денситате</span>
        <span className="info-row-value">
          {Math.round(district.population / district.area)} лок/км²
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<District | null>(null);
  const [hovered, setHovered] = useState<District | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return DISTRICTS;
    const q = search.toLowerCase();
    return DISTRICTS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.nameRo.toLowerCase().includes(q) ||
      d.nameRu.toLowerCase().includes(q)
    );
  }, [search]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <span className="header-flag">🇲🇩</span>
          <div className="header-text">
            <h1>Харта Интерактивэ а Молдовей</h1>
            <p>Районеле Републичий Молдова · {DISTRICTS.length} районе</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-value">{formatPop(TOTAL_POPULATION)}</div>
            <div className="stat-label">Популацие тоталэ</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{formatArea(TOTAL_AREA)}</div>
            <div className="stat-label">Супрафацэ</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">33</div>
            <div className="stat-label">Районе</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="main">
        {/* Map */}
        <div className="map-area">
          <svg
            viewBox="0 0 280 420"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHovered(null)}
          >
            {DISTRICTS.map(d => {
              const path = DISTRICT_PATHS[d.id];
              if (!path) return null;
              const isActive = selected?.id === d.id;
              const isFiltered = filtered.some(f => f.id === d.id);
              return (
                <g key={d.id}>
                  <path
                    d={path}
                    fill={d.color}
                    className={`district-path ${isActive ? 'active' : ''}`}
                    style={{ opacity: isFiltered ? 1 : 0.25 }}
                    onClick={() => setSelected(isActive ? null : d)}
                    onMouseEnter={() => setHovered(d)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  <text
                    x={d.cx}
                    y={d.cy}
                    className={`district-label ${isActive ? 'active' : ''}`}
                    style={{ opacity: isFiltered ? 1 : 0.2 }}
                  >
                    {d.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <div
              className="tooltip"
              style={{ left: tooltipPos.x, top: tooltipPos.y }}
            >
              <div className="tooltip-name">{hovered.coat} {hovered.name}</div>
              <div className="tooltip-sub">
                {hovered.nameRo} · {formatPop(hovered.population)}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="map-legend">
            <p>🖱️ Клик — информацие деспре район</p>
            <p>🔍 Каутэ ын листэ →</p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Search */}
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Каутэ ун район..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Selected district info */}
          {selected ? (
            <DistrictPanel district={selected} />
          ) : (
            <div className="sidebar-empty">
              <div className="sidebar-empty-icon">🗺️</div>
              <h2>Харта Молдовей</h2>
              <p>
                Апасэ пе ун район де пе хартэ<br />
                пентру а ведя информацие деталятэ.
              </p>
            </div>
          )}

          {/* District list */}
          <div className="district-list">
            <h3>Тоате районеле ({filtered.length})</h3>
            {filtered
              .sort((a, b) => b.population - a.population)
              .map(d => (
                <div
                  key={d.id}
                  className={`district-list-item ${selected?.id === d.id ? 'active' : ''}`}
                  onClick={() => setSelected(selected?.id === d.id ? null : d)}
                >
                  <div className="district-dot" style={{ background: d.color }} />
                  <span className="district-list-name">{d.name}</span>
                  <span className="district-list-pop">{formatPop(d.population)}</span>
                </div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
