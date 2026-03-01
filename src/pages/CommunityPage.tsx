import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCommunityPosts } from '../mock/data';
import type { CommunityPost } from '../types';

const PostCard = ({
  post,
  onCopy,
}: {
  post: CommunityPost;
  onCopy: (p: CommunityPost) => void;
}) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.isLiked || false);
  const [favorited, setFavorited] = useState(post.isFavorited || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [expanded, setExpanded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited(!favorited);
  };

  return (
    <div
      style={{
        background: '#0d0d1a',
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s',
        breakInside: 'avoid',
        marginBottom: 18,
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          height: 220,
          background: post.coverGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 70,
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        🚗
        {/* 3D Preview label */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 11,
            color: '#00d4ff',
            backdropFilter: 'blur(4px)',
          }}
        >
          🔮 3D 方案
        </div>
        {/* Tags */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'flex-end',
          }}
        >
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 5,
                padding: '2px 8px',
                fontSize: 10,
                color: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        {/* User info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {post.userAvatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{post.userName}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
              {post.carName} · {post.createdAt}
            </div>
          </div>
          <button
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '4px 12px',
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            + 关注
          </button>
        </div>

        {/* Title + Description */}
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
          {post.title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6,
            marginBottom: 14,
            overflow: 'hidden',
            maxHeight: expanded ? 'none' : 40,
          }}
        >
          {post.description}
        </div>

        {/* All tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.15)',
                borderRadius: 5,
                padding: '2px 9px',
                fontSize: 11,
                color: 'rgba(0,212,255,0.8)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <button
            onClick={handleLike}
            style={{
              background: liked ? 'rgba(255,80,80,0.1)' : 'none',
              border: 'none',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: liked ? '#ff5050' : 'rgba(255,255,255,0.45)',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            {liked ? '❤️' : '🤍'} {likeCount.toLocaleString()}
          </button>

          <button
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            💬 {post.comments}
          </button>

          <button
            onClick={handleFav}
            style={{
              background: favorited ? 'rgba(255,215,0,0.1)' : 'none',
              border: 'none',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: favorited ? '#ffd700' : 'rgba(255,255,255,0.4)',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            {favorited ? '⭐' : '☆'} {post.favorites}
          </button>

          <div style={{ flex: 1 }} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(post);
            }}
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 8,
              padding: '6px 12px',
              color: '#00d4ff',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            复制方案
          </button>

          <button
            onClick={() => navigate('/workshop')}
            style={{
              background: 'rgba(255,107,53,0.08)',
              border: '1px solid rgba(255,107,53,0.2)',
              borderRadius: 8,
              padding: '6px 12px',
              color: '#ff6b35',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            求链接
          </button>
        </div>
      </div>
    </div>
  );
};

// Copy Toast
const CopyToast = ({ post, onClose }: { post: CommunityPost; onClose: () => void }) => (
  <div
    style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#0d0d1a',
      border: '1px solid rgba(0,212,255,0.3)',
      borderRadius: 14,
      padding: '16px 28px',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: '0 0 40px rgba(0,212,255,0.15)',
    }}
  >
    <span style={{ fontSize: 20 }}>✅</span>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>方案已复制</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
        "{post.title}" 已加入你的工坊
      </div>
    </div>
    <button
      onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer',
        fontSize: 16,
        marginLeft: 8,
      }}
    >
      ✕
    </button>
  </div>
);

export const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'recommend' | 'latest' | 'following'>('recommend');
  const [copiedPost, setCopiedPost] = useState<CommunityPost | null>(null);

  const tabs = [
    { key: 'recommend', label: '🔥 推荐' },
    { key: 'latest', label: '🆕 最新' },
    { key: 'following', label: '👥 关注' },
  ] as const;

  const displayPosts =
    activeTab === 'latest'
      ? [...mockCommunityPosts].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : activeTab === 'following'
      ? mockCommunityPosts.slice(0, 3)
      : [...mockCommunityPosts].sort((a, b) => b.likes - a.likes);

  const handleCopy = (post: CommunityPost) => {
    setCopiedPost(post);
    setTimeout(() => setCopiedPost(null), 3000);
  };

  return (
    <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '52px 80px 0',
          background: 'linear-gradient(180deg, #07071a 0%, #050508 100%)',
        }}
      >
        <div style={{ fontSize: 11, color: '#ff6b35', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
          COMMUNITY
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: -1 }}>
          改装社区
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>
          看看大家都在玩什么 · 分享你的改装成果
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab.key ? '#ff6b35' : 'transparent'}`,
                padding: '10px 24px 12px',
                cursor: 'pointer',
                color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: 14,
                fontWeight: activeTab === tab.key ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '36px 80px 80px', display: 'flex', gap: 32 }}>
        {/* Post Feed: Masonry-style 3 columns */}
        <div style={{ flex: 1 }}>
          {activeTab === 'following' && displayPosts.length < 4 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>👥</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                你还没有关注任何人
              </div>
              <div style={{ fontSize: 13, marginBottom: 24 }}>
                去发现有趣的改装达人，关注他们的最新动态
              </div>
              <button
                onClick={() => setActiveTab('recommend')}
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '10px 28px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                去发现达人
              </button>
            </div>
          ) : (
            <div
              style={{
                columns: 3,
                columnGap: 18,
              }}
            >
              {displayPosts.map((post) => (
                <PostCard key={post.id} post={post} onCopy={handleCopy} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 240, flexShrink: 0 }}>
          {/* Hot Tags */}
          <div
            style={{
              background: '#0d0d1a',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '20px',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              热门标签
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['BMW', 'M3', '保时捷', '改色', 'NISMO', '轮毂', 'JDM', 'BBS', '消光黑'].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255,107,53,0.08)',
                      border: '1px solid rgba(255,107,53,0.15)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: 12,
                      color: 'rgba(255,107,53,0.8)',
                      cursor: 'pointer',
                    }}
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Top Builders */}
          <div
            style={{
              background: '#0d0d1a',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '20px',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              本周改装达人
            </div>
            {mockCommunityPosts.slice(0, 4).map((post, i) => (
              <div
                key={post.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background:
                      i === 0
                        ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
                        : i === 1
                        ? 'linear-gradient(135deg, #c0c0c0, #808080)'
                        : i === 2
                        ? 'linear-gradient(135deg, #cd7f32, #8b4513)'
                        : 'linear-gradient(135deg, #333, #555)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {post.userName}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    ❤️ {post.likes.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Post CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(0,85,255,0.08) 100%)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 16,
              padding: '24px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>🚀</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              分享你的改装
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16, lineHeight: 1.5 }}>
              将你的工坊方案发布到社区，获得更多灵感
            </div>
            <button
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                border: 'none',
                borderRadius: 10,
                padding: '10px',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              去工坊创作 →
            </button>
          </div>
        </div>
      </div>

      {/* Copy Toast */}
      {copiedPost && <CopyToast post={copiedPost} onClose={() => setCopiedPost(null)} />}
    </div>
  );
};
