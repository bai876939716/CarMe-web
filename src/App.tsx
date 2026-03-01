import { useState } from 'react';
import { Button, Layout, ConfigProvider } from 'antd';
import { CarSelector } from './components/CarSelector';
import { PartPanel } from './components/PartPanel';
import { WorkshopScene } from './scenes/WorkshopScene';
import { useWorkshopStore } from './stores/workshopStore';
import './App.css';

const { Header, Content, Sider } = Layout;

function App() {
  const [inWorkshop, setInWorkshop] = useState(false);
  const { selectedCar } = useWorkshopStore();

  const handleEnterWorkshop = () => {
    if (selectedCar) {
      setInWorkshop(true);
    } else {
      alert('请先选择车型');
    }
  };

  return (
    <ConfigProvider>
      {!inWorkshop ? (
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ padding: '50px', textAlign: 'center' }}>
            <h1>CarMe 改装工坊</h1>
            <CarSelector />
            <Button
              type="primary"
              size="large"
              onClick={handleEnterWorkshop}
              disabled={!selectedCar}
              style={{ marginTop: '20px' }}
            >
              进入 3D 工坊
            </Button>
          </Content>
        </Layout>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#001529', color: '#fff', padding: '0 20px' }}>
            <h2 style={{ color: '#fff', margin: 0 }}>CarMe 3D 工坊</h2>
            <Button
              type="link"
              style={{ color: '#fff', float: 'right', marginTop: '16px' }}
              onClick={() => setInWorkshop(false)}
            >
              返回首页
            </Button>
          </Header>
          <Layout>
            <Sider width={300} style={{ background: '#fff' }}>
              <PartPanel />
            </Sider>
            <Content style={{ padding: '20px', background: '#f0f2f5' }}>
              <div
                id="canvas-container"
                style={{
                  width: '100%',
                  height: 'calc(100vh - 100px)',
                  background: '#1a1a1a',
                  borderRadius: '8px',
                }}
              >
                <WorkshopScene />
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </ConfigProvider>
  );
}

export default App;
