/* V3 Tweaks — ステージ／表示モードの操作（TypeScript版） */

import React, { useEffect, FC, ReactElement, useState } from 'react';

interface V3DefaultsType {
  stage: string;
}

const V3_DEFAULTS: V3DefaultsType = /*EDITMODE-BEGIN*/ {
  stage: 'そだてる（中級者）',
} /*EDITMODE-END*/;

const V3_STAGE_LABELS = ['みまもり（ビギナー）', 'そだてる（中級者）', 'ひろげる（ヘビー）'];

// Simple TweaksPanel mock for compatibility
interface TweaksSectionProps {
  label: string;
}

const TweaksSection: FC<TweaksSectionProps> = ({ label }): ReactElement =>
  React.createElement('div', { style: { marginBottom: '12px' } },
    React.createElement('h3', { style: { fontSize: '12px', fontWeight: 600, margin: '0 0 8px 0' } }, label)
  );

interface TweakRadioProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const TweakRadio: FC<TweakRadioProps> = ({ label, value, options, onChange }): ReactElement =>
  React.createElement('div', null,
    React.createElement('label', { style: { display: 'block', fontSize: '12px', marginBottom: '8px' } }, label),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
      options.map((option) =>
        React.createElement('label', {
          key: option,
          style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' },
        },
          React.createElement('input', {
            type: 'radio',
            name: label,
            value: option,
            checked: value === option,
            onChange: (e) => onChange(e.currentTarget.value),
          }),
          option
        )
      )
    )
  );

interface TweaksPanelProps {
  children: React.ReactNode;
}

const TweaksPanel: FC<TweaksPanelProps> = ({ children }): ReactElement =>
  React.createElement('div', {
    style: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif',
      zIndex: 9999,
    },
  }, children);

interface TweaksState {
  stage: string;
}

const V3TweaksApp: FC = (): ReactElement => {
  const [tweaks, setTweaks] = useState<TweaksState>(V3_DEFAULTS);

  const handleTweakChange = (key: keyof TweaksState, value: string): void => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const stageIndex = V3_STAGE_LABELS.indexOf(tweaks.stage);
    const stageNum = stageIndex + 1;

    if (stageNum >= 1 && stageNum <= 3) {
      const hbv3 = (window as any).HBV3;
      if (hbv3 && hbv3.getStage && hbv3.setStage) {
        if (hbv3.getStage() !== stageNum) {
          hbv3.setStage(stageNum);
        }
      }
    }
  }, [tweaks.stage]);

  return React.createElement(TweaksPanel, null,
    React.createElement(TweaksSection, { label: 'エンドユーザー像' }),
    React.createElement(TweakRadio, {
      label: 'ステージ',
      value: tweaks.stage,
      options: V3_STAGE_LABELS,
      onChange: (v) => handleTweakChange('stage', v),
    })
  );
};

// Mount tweaks panel
const mountV3Tweaks = (): void => {
  const host = document.createElement('div');
  host.id = 'v3-tweaks-root';
  document.body.appendChild(host);

  const ReactDOM = (window as any).ReactDOM;
  if (ReactDOM) {
    ReactDOM.createRoot(host).render(React.createElement(V3TweaksApp));
  }
};

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountV3Tweaks);
  } else {
    mountV3Tweaks();
  }
}

export default V3TweaksApp;
