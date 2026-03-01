import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser, mockMyCars, mockMyWorks, mockCommunityPosts, mockProducts } from '../mock/data';

type TabKey = 'cars' | 'works' | 'favorites' | 'orders' | 'following';

const tabList = [
  { key: 'cars' as TabKey, label: '🚗 我的爱车', count: mockMyCars.length },
  { key: 'works' as TabKey, label: '🔧 我的方案', count: mockMyWorks.length },
  { key: 'favorites' as TabKey, label: '⭐ 我的收藏', count: 8 },
  { key: 'orders' as TabKey, label: '🛒 我的订单', count: 3 },
  { key: 'following' as TabKey, label: '👥 关注', count: mockUser.following },
];

// My Cars Tab
const MyCarsTab = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>
          已添加 <span style={{ color: '#00d4ff', fontWeight: 700 }}>{mockMyCars.length}</span> 台
        </div>
        <button
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
            border: 'none',
            borderRadius: 10,
            padding: '9px 22px',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + 添加爱车
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {mockMyCars.map((car) => (
          <div
            key={car.id}
            style={{
              background: car.gradient || 'linear-gradient(135deg, #0a0a14 0%, #1a1a3e 100%)',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
              }}
            >
              🏎️
            </div>
            <div style={{ padding: '14px 18px 18px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {car.name}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
                {car.description}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => navigate('/workshop')}
                  style={{
                    flex: 1,
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: 8,
                    padding: '7px',
                    color: '#00d4ff',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  进入工坊
                </button>
                <button
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    padding: '7px',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  管理
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Car Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 16,
            border: '1px dashed rgba(255,255,255,0.1)',
            height: 234,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            gap: 10,
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: 36, opacity: 0.3 }}>+</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>添加爱车</div>
        </div>
      </div>
    </div>
  );
};

// My Works Tab
const MyWorksTab = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>
          共 <span style={{ color: '#00d4ff', fontWeight: 700 }}>{mockMyWorks.length}</span> 个方案
        </div>
        <button
          onClick={() => navigate('/workshop')}
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
            border: 'none',
            borderRadius: 10,
            padding: '9px 22px',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + 新建方案
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {mockMyWorks.map((work) => (
          <div
            key={work.id}
            style={{
              background: '#0d0d1a',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                height: 140,
                background: work.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
                position: 'relative',
              }}
            >
              🚗
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 40,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                }}
              />
            </div>
            <div style={{ padding: '14px 18px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                {work.title}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>
                {work.car} · {work.createdAt}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, color: 'rgba(255,107,53,0.8)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  ❤️ <span style={{ color: 'rgba(255,255,255,0.5)' }}>{work.likes}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => navigate('/workshop')}
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      borderRadius: 7,
                      padding: '5px 12px',
                      color: '#00d4ff',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    编辑
                  </button>
                  <button
                    style={{
                      background: 'rgba(255,107,53,0.08)',
                      border: '1px solid rgba(255,107,53,0.15)',
                      borderRadius: 7,
                      padding: '5px 12px',
                      color: '#ff6b35',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    分享
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Favorites Tab
const FavoritesTab = () => {
  const navigate = useNavigate();
  const [favTab, setFavTab] = useState<'works' | 'parts'>('works');

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        {[
          { key: 'works' as const, label: '收藏的方案' },
          { key: 'parts' as const, label: '收藏的配件' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFavTab(t.key)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${favTab === t.key ? '#00d4ff' : 'transparent'}`,
              padding: '8px 20px',
              cursor: 'pointer',
              color: favTab === t.key ? '#00d4ff' : 'rgba(255,255,255,0.4)',
              fontSize: 14,
              fontWeight: favTab === t.key ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {favTab === 'works' ? (
        <div style={{ columns: 3, columnGap: 16 }}>
          {mockCommunityPosts.slice(0, 4).map((post) => (
            <div
              key={post.id}
              style={{
                background: post.coverGradient,
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 16,
                breakInside: 'avoid',
                cursor: 'pointer',
              }}
            >
              <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50 }}>🚗</div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{post.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>@{post.userName}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {mockProducts.slice(0, 4).map((p) => (
            <div
              key={p.id}
              style={{
                background: '#0d0d1a',
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: 130,
                  background: p.coverGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 46,
                }}
              >
                {p.category === 'wheel' ? '⚙️' : '🔧'}
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#ff6b35' }}>¥{p.price.toLocaleString()}</div>
                <button
                  onClick={() => navigate('/mall')}
                  style={{
                    marginTop: 10,
                    width: '100%',
                    background: 'rgba(255,107,53,0.1)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    borderRadius: 7,
                    padding: '7px',
                    color: '#ff6b35',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  去购买
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Orders Tab
const OrdersTab = () => {
  const mockOrders = [
    { id: 'ORD-20260228-001', name: 'BBS CH-R 19寸 银色轮毂', brand: 'BBS', price: 12800, status: '已发货', gradient: 'linear-gradient(135deg, #1e2a35, #2c3e50)', date: '2026-02-28' },
    { id: 'ORD-20260215-002', name: 'Volk Racing TE37 17寸', brand: 'Rays', price: 9600, status: '已完成', gradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', date: '2026-02-15' },
    { id: 'ORD-20260101-003', name: '3M 2080 消光黑车身贴膜', brand: '3M', price: 6800, status: '已完成', gradient: 'linear-gradient(135deg, #0e0e0e, #1c1c1c)', date: '2026-01-01' },
  ];

  const statusColor: Record<string, string> = {
    '待付款': '#ff6b35',
    '待发货': '#ffd700',
    '已发货': '#00d4ff',
    '已完成': 'rgba(255,255,255,0.4)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {mockOrders.map((order) => (
        <div
          key={order.id}
          style={{
            background: '#0d0d1a',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 100,
              height: 80,
              background: order.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              flexShrink: 0,
            }}
          >
            ⚙️
          </div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{order.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
              {order.brand} · 订单号：{order.id}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{order.date}</div>
          </div>
          <div style={{ padding: '0 24px', textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ff6b35', marginBottom: 4 }}>
              ¥{order.price.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: statusColor[order.status] || 'rgba(255,255,255,0.4)',
              }}
            >
              {order.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Following Tab
const FollowingTab = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
      {mockCommunityPosts.slice(0, 5).map((post) => (
        <div
          key={post.id}
          style={{
            background: '#0d0d1a',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {post.userAvatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
              {post.userName}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
              ❤️ {post.likes.toLocaleString()}  💬 {post.comments}
            </div>
            <button
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              已关注
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('cars');

  const tabContent: Record<TabKey, React.ReactNode> = {
    cars: <MyCarsTab />,
    works: <MyWorksTab />,
    favorites: <FavoritesTab />,
    orders: <OrdersTab />,
    following: <FollowingTab />,
  };

  return (
    <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
      {/* Profile Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #07071a 0%, #050508 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 80px 0',
        }}
      >
        {/* User Info Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 36 }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: 900,
                color: '#fff',
                boxShadow: '0 0 30px rgba(0,212,255,0.3)',
              }}
            >
              {mockUser.avatar}
            </div>
            {/* Level badge */}
            <div
              style={{
                position: 'absolute',
                bottom: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #ff6b35, #ff9900)',
                borderRadius: 10,
                padding: '2px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
              }}
            >
              {mockUser.level}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: -0.5 }}>
              {mockUser.name}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 16px' }}>
              {mockUser.bio}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 36 }}>
              {[
                { value: mockUser.worksCount, label: '方案' },
                { value: mockUser.followers.toLocaleString(), label: '粉丝' },
                { value: mockUser.following, label: '关注' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '9px 22px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ✏️ 编辑资料
            </button>
            <button
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '9px 22px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              ⚙️ 设置
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 0 }}>
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab.key ? '#00d4ff' : 'transparent'}`,
                padding: '10px 22px 12px',
                cursor: 'pointer',
                color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.4)',
                fontSize: 14,
                fontWeight: activeTab === tab.key ? 600 : 400,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  style={{
                    background: activeTab === tab.key ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: '1px 7px',
                    fontSize: 11,
                    color: activeTab === tab.key ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '36px 80px 80px' }}>
        {tabContent[activeTab]}
      </div>
    </div>
  );
};
