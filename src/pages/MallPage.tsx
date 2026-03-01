import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../mock/data';
import type { Product } from '../types';

const categoryMap: Record<string, string> = {
  all: '全部',
  wheel: '轮毂',
  bodykit: '包围套件',
  wrap: '车身贴膜',
  color: '改色',
  exhaust: '排气系统',
};

const brandList = ['全部', 'BBS', 'Rays', 'Enkei', 'NISMO', 'Mercedes-AMG', '3M', 'Porsche', 'Akrapovic'];

const sortOptions = [
  { key: 'hot', label: '销量优先' },
  { key: 'price_asc', label: '价格 ↑' },
  { key: 'price_desc', label: '价格 ↓' },
  { key: 'rating', label: '评分优先' },
];

const ProductCard = ({
  product,
  onPreview,
}: {
  product: Product;
  onPreview: (p: Product) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0d0d1a',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.05)'}`,
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4)' : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 170,
          background: product.coverGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
          position: 'relative',
        }}
      >
        {product.category === 'wheel'
          ? '⚙️'
          : product.category === 'bodykit'
          ? '🚗'
          : product.category === 'wrap' || product.category === 'color'
          ? '🎨'
          : product.category === 'exhaust'
          ? '🔧'
          : '📦'}
        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
          {product.isNew && (
            <span
              style={{
                background: '#00d4ff',
                borderRadius: 5,
                padding: '2px 9px',
                fontSize: 10,
                fontWeight: 800,
                color: '#000',
              }}
            >
              NEW
            </span>
          )}
          {product.isHot && (
            <span
              style={{
                background: '#ff6b35',
                borderRadius: 5,
                padding: '2px 9px',
                fontSize: 10,
                fontWeight: 800,
                color: '#fff',
              }}
            >
              HOT
            </span>
          )}
        </div>
        {/* Preview button on hover */}
        {hovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(product);
            }}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              background: 'rgba(0,212,255,0.9)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 14px',
              color: '#000',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            上车预览 →
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginBottom: 5, textTransform: 'uppercase' }}>
          {product.brand} · {categoryMap[product.category] || product.category}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.4,
            marginBottom: 8,
            height: 40,
            overflow: 'hidden',
          }}
        >
          {product.name}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} style={{ fontSize: 11, color: s <= Math.round(product.rating) ? '#ffd700' : 'rgba(255,255,255,0.2)' }}>
                ★
              </span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {product.rating} ({product.sales}件)
          </span>
        </div>

        {/* Compatible cars */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {product.compatibleCars.slice(0, 2).map((car) => (
            <span
              key={car}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '2px 7px',
                fontSize: 10,
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {car}
            </span>
          ))}
          {product.compatibleCars.length > 2 && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
              +{product.compatibleCars.length - 2}
            </span>
          )}
        </div>

        {/* Price + Cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#ff6b35' }}>
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', marginLeft: 6 }}>
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            style={{
              background: 'rgba(255,107,53,0.12)',
              border: '1px solid rgba(255,107,53,0.3)',
              borderRadius: 8,
              padding: '6px 14px',
              color: '#ff6b35',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            加入清单
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Detail Modal
const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0d0d1a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24,
          width: '100%',
          maxWidth: 760,
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex' }}>
          {/* Left: visual */}
          <div
            style={{
              width: 300,
              background: product.coverGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 90,
              flexShrink: 0,
            }}
          >
            {product.category === 'wheel' ? '⚙️' : product.category === 'exhaust' ? '🔧' : '🚗'}
          </div>
          {/* Right: info */}
          <div style={{ flex: 1, padding: '32px 32px 28px' }}>
            <div style={{ fontSize: 11, color: '#00d4ff', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>
              {product.brand} · {categoryMap[product.category]}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>
              {product.name}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px', lineHeight: 1.6 }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {product.compatibleCars.map((car) => (
                <span
                  key={car}
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: 5,
                    padding: '3px 10px',
                    fontSize: 11,
                    color: '#00d4ff',
                  }}
                >
                  {car}
                </span>
              ))}
            </div>

            <div style={{ fontSize: 28, fontWeight: 900, color: '#ff6b35', marginBottom: 4 }}>
              ¥{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginBottom: 24 }}>
                原价 ¥{product.originalPrice.toLocaleString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => navigate('/workshop')}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '12px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔧 上车预览
              </button>
              <button
                style={{
                  flex: 1,
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.3)',
                  borderRadius: 10,
                  padding: '12px',
                  color: '#ff6b35',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                🛒 加入购物车
              </button>
            </div>
          </div>
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            cursor: 'pointer',
            color: '#fff',
            fontSize: 16,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export const MallPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('全部');
  const [selectedSort, setSelectedSort] = useState('hot');
  const [searchText, setSearchText] = useState('');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const filtered = mockProducts
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => selectedBrand === '全部' || p.brand === selectedBrand)
    .filter(
      (p) =>
        !searchText ||
        p.name.includes(searchText) ||
        p.brand.includes(searchText)
    )
    .sort((a, b) => {
      if (selectedSort === 'price_asc') return a.price - b.price;
      if (selectedSort === 'price_desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      return b.sales - a.sales;
    });

  return (
    <div style={{ background: '#050508', minHeight: '100vh', color: '#fff' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #07071a 0%, #0d0d2e 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '60px 80px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '40%',
            background: 'radial-gradient(ellipse at right, rgba(0,85,255,0.1) 0%, transparent 70%)',
          }}
        />
        <div style={{ fontSize: 11, color: '#00d4ff', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
          PARTS MALL
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: -1 }}>
          配件商城
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          精选全球顶级改装品牌 · 找到你的下一件利器
        </p>

        {/* Search */}
        <div style={{ marginTop: 28, position: 'relative', maxWidth: 460 }}>
          <span
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 16,
            }}
          >
            🔍
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索配件名称、品牌..."
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '12px 16px 12px 46px',
              color: '#fff',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', padding: '0 80px 80px' }}>
        {/* Left: Filter Sidebar */}
        <div
          style={{
            width: 220,
            flexShrink: 0,
            paddingTop: 36,
            paddingRight: 32,
          }}
        >
          {/* Category Filter */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              品类
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Object.entries(categoryMap).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  style={{
                    background: selectedCategory === key ? 'rgba(0,212,255,0.1)' : 'none',
                    border: 'none',
                    borderRadius: 8,
                    padding: '9px 12px',
                    color: selectedCategory === key ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    fontWeight: selectedCategory === key ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              品牌
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {brandList.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  style={{
                    background: selectedBrand === brand ? 'rgba(0,212,255,0.1)' : 'none',
                    border: 'none',
                    borderRadius: 8,
                    padding: '9px 12px',
                    color: selectedBrand === brand ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    fontWeight: selectedBrand === brand ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              价格区间
            </div>
            {['5,000以下', '5,000–20,000', '20,000–50,000', '50,000以上'].map((range) => (
              <button
                key={range}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 13,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                ¥ {range}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product List */}
        <div style={{ flex: 1, paddingTop: 36 }}>
          {/* Sort bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
              共找到{' '}
              <span style={{ color: '#00d4ff', fontWeight: 700 }}>{filtered.length}</span> 件配件
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedSort(opt.key)}
                  style={{
                    background: selectedSort === opt.key ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selectedSort === opt.key ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 8,
                    padding: '6px 16px',
                    color: selectedSort === opt.key ? '#00d4ff' : 'rgba(255,255,255,0.45)',
                    fontSize: 12,
                    fontWeight: selectedSort === opt.key ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 18,
            }}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onPreview={setPreviewProduct} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'rgba(255,255,255,0.3)',
                fontSize: 15,
              }}
            >
              😅 没有找到符合条件的配件
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {previewProduct && (
        <ProductModal product={previewProduct} onClose={() => setPreviewProduct(null)} />
      )}
    </div>
  );
};
