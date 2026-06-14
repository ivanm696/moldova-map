import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { DISTRICTS, TOTAL_POPULATION, TOTAL_AREA } from './data';
import { DISTRICT_PATHS } from './mapPaths';
function formatPop(n) {
    if (n >= 1000000)
        return (n / 1000000).toFixed(2) + ' млн';
    if (n >= 1000)
        return (n / 1000).toFixed(1) + ' мий';
    return String(n);
}
function formatArea(n) {
    return n.toLocaleString('ru') + ' км²';
}
// Sidebar district info panel
function DistrictPanel({ district }) {
    return (_jsxs("div", { className: "district-info", children: [_jsxs("div", { className: "district-info-header", children: [_jsx("div", { className: "district-info-coat", children: district.coat }), _jsx("div", { className: "district-info-name", children: district.name }), _jsxs("div", { className: "district-info-name-ro", children: [district.nameRo, " \u00B7 ", district.nameRu] }), _jsx("div", { className: "district-info-desc", children: district.description })] }), _jsxs("div", { className: "stats-grid", children: [_jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-card-label", children: "\u041F\u043E\u043F\u0443\u043B\u0430\u0446\u0438\u0435" }), _jsx("div", { className: "stat-card-value", children: formatPop(district.population) })] }), _jsxs("div", { className: "stat-card", children: [_jsx("div", { className: "stat-card-label", children: "\u0421\u0443\u043F\u0440\u0430\u0444\u0430\u0446\u044D" }), _jsxs("div", { className: "stat-card-value", children: [district.area.toLocaleString(), _jsx("span", { className: "stat-card-unit", children: "\u043A\u043C\u00B2" })] })] })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-row-label", children: "\u0427\u0435\u043D\u0442\u0440\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432" }), _jsx("span", { className: "info-row-value", children: district.capital })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-row-label", children: "Denumire rom\u00E2n\u0103" }), _jsx("span", { className: "info-row-value", children: district.capitalRo })] }), _jsxs("div", { className: "info-row", children: [_jsx("span", { className: "info-row-label", children: "\u0414\u0435\u043D\u0441\u0438\u0442\u0430\u0442\u0435" }), _jsxs("span", { className: "info-row-value", children: [Math.round(district.population / district.area), " \u043B\u043E\u043A/\u043A\u043C\u00B2"] })] })] }));
}
export default function App() {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [search, setSearch] = useState('');
    const filtered = useMemo(() => {
        if (!search.trim())
            return DISTRICTS;
        const q = search.toLowerCase();
        return DISTRICTS.filter(d => d.name.toLowerCase().includes(q) ||
            d.nameRo.toLowerCase().includes(q) ||
            d.nameRu.toLowerCase().includes(q));
    }, [search]);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };
    return (_jsxs("div", { className: "app", children: [_jsxs("header", { className: "header", children: [_jsxs("div", { className: "header-title", children: [_jsx("span", { className: "header-flag", children: "\uD83C\uDDF2\uD83C\uDDE9" }), _jsxs("div", { className: "header-text", children: [_jsx("h1", { children: "\u0425\u0430\u0440\u0442\u0430 \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u044D \u0430 \u041C\u043E\u043B\u0434\u043E\u0432\u0435\u0439" }), _jsxs("p", { children: ["\u0420\u0430\u0439\u043E\u043D\u0435\u043B\u0435 \u0420\u0435\u043F\u0443\u0431\u043B\u0438\u0447\u0438\u0439 \u041C\u043E\u043B\u0434\u043E\u0432\u0430 \u00B7 ", DISTRICTS.length, " \u0440\u0430\u0439\u043E\u043D\u0435"] })] })] }), _jsxs("div", { className: "header-stats", children: [_jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: formatPop(TOTAL_POPULATION) }), _jsx("div", { className: "stat-label", children: "\u041F\u043E\u043F\u0443\u043B\u0430\u0446\u0438\u0435 \u0442\u043E\u0442\u0430\u043B\u044D" })] }), _jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: formatArea(TOTAL_AREA) }), _jsx("div", { className: "stat-label", children: "\u0421\u0443\u043F\u0440\u0430\u0444\u0430\u0446\u044D" })] }), _jsxs("div", { className: "stat-item", children: [_jsx("div", { className: "stat-value", children: "33" }), _jsx("div", { className: "stat-label", children: "\u0420\u0430\u0439\u043E\u043D\u0435" })] })] })] }), _jsxs("div", { className: "main", children: [_jsxs("div", { className: "map-area", children: [_jsx("svg", { viewBox: "0 0 280 420", onMouseMove: handleMouseMove, onMouseLeave: () => setHovered(null), children: DISTRICTS.map(d => {
                                    const path = DISTRICT_PATHS[d.id];
                                    if (!path)
                                        return null;
                                    const isActive = selected?.id === d.id;
                                    const isFiltered = filtered.some(f => f.id === d.id);
                                    return (_jsxs("g", { children: [_jsx("path", { d: path, fill: d.color, className: `district-path ${isActive ? 'active' : ''}`, style: { opacity: isFiltered ? 1 : 0.25 }, onClick: () => setSelected(isActive ? null : d), onMouseEnter: () => setHovered(d), onMouseLeave: () => setHovered(null) }), _jsx("text", { x: d.cx, y: d.cy, className: `district-label ${isActive ? 'active' : ''}`, style: { opacity: isFiltered ? 1 : 0.2 }, children: d.name })] }, d.id));
                                }) }), hovered && (_jsxs("div", { className: "tooltip", style: { left: tooltipPos.x, top: tooltipPos.y }, children: [_jsxs("div", { className: "tooltip-name", children: [hovered.coat, " ", hovered.name] }), _jsxs("div", { className: "tooltip-sub", children: [hovered.nameRo, " \u00B7 ", formatPop(hovered.population)] })] })), _jsxs("div", { className: "map-legend", children: [_jsx("p", { children: "\uD83D\uDDB1\uFE0F \u041A\u043B\u0438\u043A \u2014 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435 \u0434\u0435\u0441\u043F\u0440\u0435 \u0440\u0430\u0439\u043E\u043D" }), _jsx("p", { children: "\uD83D\uDD0D \u041A\u0430\u0443\u0442\u044D \u044B\u043D \u043B\u0438\u0441\u0442\u044D \u2192" })] })] }), _jsxs("aside", { className: "sidebar", children: [_jsx("div", { className: "search-bar", children: _jsx("input", { className: "search-input", placeholder: "\u041A\u0430\u0443\u0442\u044D \u0443\u043D \u0440\u0430\u0439\u043E\u043D...", value: search, onChange: e => setSearch(e.target.value) }) }), selected ? (_jsx(DistrictPanel, { district: selected })) : (_jsxs("div", { className: "sidebar-empty", children: [_jsx("div", { className: "sidebar-empty-icon", children: "\uD83D\uDDFA\uFE0F" }), _jsx("h2", { children: "\u0425\u0430\u0440\u0442\u0430 \u041C\u043E\u043B\u0434\u043E\u0432\u0435\u0439" }), _jsxs("p", { children: ["\u0410\u043F\u0430\u0441\u044D \u043F\u0435 \u0443\u043D \u0440\u0430\u0439\u043E\u043D \u0434\u0435 \u043F\u0435 \u0445\u0430\u0440\u0442\u044D", _jsx("br", {}), "\u043F\u0435\u043D\u0442\u0440\u0443 \u0430 \u0432\u0435\u0434\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435 \u0434\u0435\u0442\u0430\u043B\u044F\u0442\u044D."] })] })), _jsxs("div", { className: "district-list", children: [_jsxs("h3", { children: ["\u0422\u043E\u0430\u0442\u0435 \u0440\u0430\u0439\u043E\u043D\u0435\u043B\u0435 (", filtered.length, ")"] }), filtered
                                        .sort((a, b) => b.population - a.population)
                                        .map(d => (_jsxs("div", { className: `district-list-item ${selected?.id === d.id ? 'active' : ''}`, onClick: () => setSelected(selected?.id === d.id ? null : d), children: [_jsx("div", { className: "district-dot", style: { background: d.color } }), _jsx("span", { className: "district-list-name", children: d.name }), _jsx("span", { className: "district-list-pop", children: formatPop(d.population) })] }, d.id)))] })] })] })] }));
}
