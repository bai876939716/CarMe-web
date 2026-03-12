import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { WorkshopPage } from './pages/WorkshopPage';
import { MallPage } from './pages/MallPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00d4ff',
          // 整体略提亮一点，避免纯黑压抑
          colorBgContainer: 'rgba(15, 18, 32, 0.75)',
          colorBgElevated: 'rgba(21, 24, 40, 0.9)',
          borderRadius: 10,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          Layout: {
            // 页面主背景从近乎纯黑调整为稍微偏蓝的深色，提高层次感
            bodyBg: '#080b16',
            headerBg: 'rgba(5, 5, 8, 0.8)',
          },
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/workshop" element={<WorkshopPage />} />
              <Route path="/mall" element={<MallPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
