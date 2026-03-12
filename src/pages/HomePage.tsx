import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockHotWorks, mockProducts, mockCommunityPosts, mockActivities } from '../mock/data';

const SectionLabel = ({ text, color = '#00d4ff' }: { text: string; color?: string }) => (
  <div
    style={{
      fontSize: 11,
      fontWeight: 700,
      color,
      letterSpacing: 3,
      textTransform: 'uppercase' as const,
      marginBottom: 10,
    }}
  >
    {text}
  </div>
);

const SectionHeader = ({
  label,
  labelColor,
  title,
  onMore,
  moreLabel = '查看全部',
}: {
  label: string;
  labelColor?: string;
  title: string;
  onMore?: () => void;
  moreLabel?: string;
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 32,
    }}
  >
    <div>
      <SectionLabel text={label} color={labelColor} />
      <h2 style={{ fontSize: 30, fontWeight: 800, color: '#fff', margin: 0 }}>{title}</h2>
    </div>
    {onMore && (
      <button
        onClick={onMore}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '7px 20px',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          fontSize: 13,
          transition: 'all 0.2s',
        }}
      >
        {moreLabel} →
      </button>
    )}
  </div>
);

export const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div
      style={{
        // 整体从近乎纯黑调整为更亮的深蓝灰，提升卡片与背景的对比
        background: 'radial-gradient(circle at 10% 0%, #20263a 0%, #070711 55%, #050508 100%)',
        color: '#fff',
        overflowX: 'hidden',
      }}
    >
      {/* ===== Hero Section ===== */}
      <section
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 80px',
          // Hero 背景整体提亮，并加入更多蓝紫色调
          background:
            'linear-gradient(135deg, #101321 0%, #11152b 55%, #0b1024 100%)',
        }}
      >
        {/* Background glows */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(0,85,255,0.12) 0%, transparent 65%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '20%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        {/* Grid lines decoration */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Left: Text Content */}
        <div style={{ maxWidth: 560, zIndex: 1, flex: '0 0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: 20,
              padding: '5px 16px',
              marginBottom: 28,
              fontSize: 13,
              color: '#00d4ff',
              letterSpacing: 0.5,
            }}
          >
            <span style={{ width: 6, height: 6, background: '#00d4ff', borderRadius: '50%', display: 'inline-block' }} />
            全新 3D 改装可视化体验
          </div>

          <h1
            style={{
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 24,
              color: '#fff',
              letterSpacing: -1,
            }}
          >
            定制你的
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #3388ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              专属座驾
            </span>
          </h1>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 44,
              lineHeight: 1.8,
              maxWidth: 440,
            }}
          >
            3D 实时预览改装效果，海量配件自由搭配。
            <br />
            在上车前，先看见你的想象。
          </p>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={() => navigate('/workshop')}
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                border: 'none',
                borderRadius: 12,
                padding: '14px 38px',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 32px rgba(0,212,255,0.35)',
                transition: 'all 0.3s',
                letterSpacing: 0.5,
              }}
            >
              🔧 开始改装
            </button>
            <button
              onClick={() => navigate('/community')}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '14px 38px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.3s',
                letterSpacing: 0.5,
              }}
            >
              探索社区
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 44, marginTop: 64 }}>
            {[
              { value: '50,000+', label: '改装方案' },
              { value: '120+', label: '品牌配件' },
              { value: '30+', label: '支持车型' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#00d4ff',
                    letterSpacing: -0.5,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: 0.5 }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Car Visual */}
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '45%',
            maxWidth: 580,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(160deg, rgba(0,40,80,0.3) 0%, rgba(0,20,60,0.15) 100%)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: 24,
              backdropFilter: 'blur(8px)',
              padding: '48px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner accents */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderTop: '2px solid rgba(0,212,255,0.4)',
                borderLeft: '2px solid rgba(0,212,255,0.4)',
                borderRadius: '8px 0 0 0',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderBottom: '2px solid rgba(0,212,255,0.4)',
                borderRight: '2px solid rgba(0,212,255,0.4)',
                borderRadius: '0 0 8px 0',
              }}
            />

            <div
              style={{
                textAlign: 'center',
                fontSize: 100,
                lineHeight: 1,
                filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.3))',
                marginBottom: 24,
              }}
            >
              🏎️
            </div>

            {/* Part labels floating */}
            {[
              { label: '轮毂', detail: 'BBS CH-R 19"', x: '-15%', y: '55%' },
              { label: '车身漆', detail: '消光黑 · 3M', x: '80%', y: '20%' },
              { label: '包围', detail: 'NISMO 碳纤维', x: '75%', y: '65%' },
            ].map((tag) => (
              <div
                key={tag.label}
                style={{
                  position: 'absolute',
                  left: tag.x,
                  top: tag.y,
                  background: 'rgba(0,10,20,0.85)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 8,
                  padding: '6px 12px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ fontSize: 10, color: '#00d4ff', letterSpacing: 1 }}>{tag.label}</div>
                <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, marginTop: 1 }}>
                  {tag.detail}
                </div>
              </div>
            ))}

            {/* Bottom glow */}
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                left: '15%',
                right: '15%',
                height: 40,
                background: 'rgba(0,212,255,0.15)',
                filter: 'blur(20px)',
                borderRadius: '50%',
              }}
            />

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                3D 实时预览 · 360° 旋转
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Hot Works Section ===== */}
      <section style={{ padding: '90px 80px 0' }}>
        <SectionHeader
          label="HOT BUILDS"
          title="热门改装方案"
          onMore={() => navigate('/community')}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {mockHotWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => navigate('/community')}
              onMouseEnter={() => setHoveredWork(work.id)}
              onMouseLeave={() => setHoveredWork(null)}
              style={{
                background: work.gradient,
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                border: `1px solid ${
                  hoveredWork === work.id ? 'rgba(0,212,255,0.55)' : 'rgba(255,255,255,0.14)'
                }`,
                transition: 'all 0.25s',
                transform: hoveredWork === work.id ? 'translateY(-5px)' : 'none',
                boxShadow:
                  hoveredWork === work.id
                    ? '0 18px 40px rgba(0,0,0,0.6)'
                    : '0 10px 26px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 64,
                  position: 'relative',
                }}
              >
                {work.emoji}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background:
                      work.tag === '热门'
                        ? 'rgba(255,107,53,0.9)'
                        : work.tag === '精选'
                        ? 'rgba(0,212,255,0.9)'
                        : 'rgba(120,80,255,0.9)',
                    borderRadius: 6,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: 0.5,
                  }}
                >
                  {work.tag}
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 6,
                    lineHeight: 1.3,
                    textShadow: '0 1px 3px rgba(0,0,0,0.55)',
                  }}
                >
                  {work.title}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
                  @{work.author}
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,107,53,0.8)', fontSize: 13 }}
                >
                  ❤️ <span style={{ color: 'rgba(255,255,255,0.6)' }}>{work.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Community Picks - Horizontal Scroll ===== */}
      <section style={{ padding: '90px 80px 0' }}>
        <SectionHeader
          label="FROM COMMUNITY"
          labelColor="#ff6b35"
          title="精选社区作品"
          onMore={() => navigate('/community')}
        />

        <div
          style={{
            display: 'flex',
            gap: 18,
            overflowX: 'auto',
            paddingBottom: 12,
            scrollbarWidth: 'none',
          }}
        >
          {mockCommunityPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate('/community')}
              style={{
                background: post.coverGradient,
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.14)',
                minWidth: 270,
                width: 270,
                flexShrink: 0,
                boxShadow: '0 10px 26px rgba(0,0,0,0.45)',
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              }}
            >
              <div
                style={{
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 52,
                  opacity: 0.85,
                }}
              >
                🚗
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: 10,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {post.userAvatar}
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                    @{post.userName}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  <span>❤️ {post.likes.toLocaleString()}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== New Parts Section ===== */}
      <section style={{ padding: '90px 80px 0' }}>
        <SectionHeader
          label="NEW ARRIVALS"
          title="最新上线配件"
          onMore={() => navigate('/mall')}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {mockProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => navigate('/mall')}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                background: '#131626',
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                border: `1px solid ${
                  hoveredProduct === product.id ? 'rgba(0,212,255,0.55)' : 'rgba(255,255,255,0.14)'
                }`,
                boxShadow:
                  hoveredProduct === product.id
                    ? '0 18px 40px rgba(0,0,0,0.6)'
                    : '0 10px 26px rgba(0,0,0,0.45)',
                transition: 'all 0.25s',
                transform: hoveredProduct === product.id ? 'translateY(-5px)' : 'none',
              }}
            >
              <div
                style={{
                  height: 150,
                  background: product.coverGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 52,
                  position: 'relative',
                }}
              >
                {product.category === 'wheel'
                  ? '⚙️'
                  : product.category === 'bodykit'
                  ? '🚗'
                  : product.category === 'wrap'
                  ? '🎨'
                  : product.category === 'color'
                  ? '🎨'
                  : '🔧'}
                {product.isNew && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#00d4ff',
                      borderRadius: 5,
                      padding: '2px 9px',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#000',
                      letterSpacing: 0.5,
                    }}
                  >
                    NEW
                  </div>
                )}
                {product.isHot && !product.isNew && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#ff6b35',
                      borderRadius: 5,
                      padding: '2px 9px',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: 0.5,
                    }}
                  >
                    HOT
                  </div>
                )}
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 5,
                  }}
                >
                  {product.brand}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: 12,
                    lineHeight: 1.4,
                    height: 36,
                    overflow: 'hidden',
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#ff6b35' }}>
                      ¥{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span
                        style={{
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.25)',
                          textDecoration: 'line-through',
                          marginLeft: 6,
                        }}
                      >
                        ¥{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    已售 {product.sales}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Activities Section ===== */}
      <section style={{ padding: '90px 80px 0' }}>
        <SectionHeader
          label="EVENTS"
          labelColor="#ff6b35"
          title="官方活动"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              style={{
                background: activity.gradient,
                borderRadius: 20,
                padding: '44px 48px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: 8,
                  letterSpacing: -0.5,
                }}
              >
                {activity.title}
              </div>
              <div
                style={{ fontSize: 16, color: 'rgba(255,255,255,0.88)', marginBottom: 10, fontWeight: 500 }}
              >
                {activity.subtitle}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>
                {activity.description}
              </div>
              <button
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 10,
                  padding: '9px 26px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
              >
                立即参与 →
              </button>
              {/* Decoration circles */}
              <div
                style={{
                  position: 'absolute',
                  right: -30,
                  bottom: -30,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 40,
                  bottom: -60,
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '48px 80px',
          marginTop: 90,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              borderRadius: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 900,
              color: '#fff',
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 3,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            CARME
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
          © 2026 CarMe · 改装由此开始
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          <span style={{ cursor: 'pointer' }}>关于我们</span>
          <span style={{ cursor: 'pointer' }}>联系我们</span>
          <span style={{ cursor: 'pointer' }}>用户协议</span>
        </div>
      </footer>
    </div>
  );
};
