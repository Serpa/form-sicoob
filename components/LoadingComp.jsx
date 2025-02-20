
import { Spin } from 'antd';

export default function Loader({ size = 'default', tip, fullscreen = false }) {
    if (fullscreen) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9999,
                }}
            >
                <Spin size={size} tip={tip} />
            </div>
        );
    }

    return <Spin size={size} tip={tip} />;
};

// Cria uma variação de tela cheia pré-definida
Loader.Fullscreen = () => <Loader fullscreen />;