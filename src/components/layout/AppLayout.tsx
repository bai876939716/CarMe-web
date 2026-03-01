import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { key: '/', label: '首页' },
  { key: '/workshop', label: '改装工坊' },
  { key: '/mall', label: '配件商城' },
  { key: '/community', label: '社区' },
  { key: '/profile', label: '个人中心' },
];

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const isActive = (key: string) =>
    key === '/' ? location.pathname === '/' : location.pathname.startsWith(key);

  return (
    <div style={{ background: '#050508', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 64,
          background: 'rgba(5, 5, 8, 0.88)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          gap: 48,
        }}
      >
        {/* Logo */}
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
          onClick={() => navigate('/')}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 900,
              color: '#fff',
              boxShadow: '0 0 16px rgba(0,212,255,0.4)',
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 3,
              background: 'linear-gradient(135deg, #00d4ff 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CARME
          </span>
        </div>

        {/* Nav Items */}
        <div style={{ display: 'flex', gap: 6, flex: 1 }}>
          {navItems.map((item) => {
            const active = isActive(item.key);
            const hovered = hoveredNav === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                onMouseEnter={() => setHoveredNav(item.key)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  background: active
                    ? 'rgba(0,212,255,0.1)'
                    : hovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#00d4ff' : 'rgba(255,255,255,0.65)',
                  borderRadius: 8,
                  padding: '6px 16px',
                  transition: 'all 0.2s',
                  letterSpacing: 0.3,
                  position: 'relative',
                }}
              >
                {item.label}
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 2,
                      background: '#00d4ff',
                      borderRadius: 1,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: 1,
            flexShrink: 0,
          }}
        >
          改装由此开始
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 20,
              padding: '6px 22px',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              fontSize: 13,
              transition: 'all 0.2s',
            }}
          >
            登录
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              border: 'none',
              borderRadius: 20,
              padding: '6px 22px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              boxShadow: '0 0 14px rgba(0,212,255,0.25)',
              transition: 'all 0.2s',
            }}
          >
            免费注册
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ paddingTop: 64 }}>
        <Outlet />
      </div>
    </div>
  );
};
