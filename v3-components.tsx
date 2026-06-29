/* V3 Components — 再利用可能なコンポーネント分割（TypeScript版） */

import React, { FC, ReactElement } from 'react';
import { V3_ICONS } from './v3-icons';

interface BreakdownItem {
  lab: string;
  v: number;
  c: string;
}

interface BreakdownProps {
  futsu: number;
  others: number;
  stage: number;
  masked: boolean;
}

export const Breakdown: FC<BreakdownProps> = ({ futsu, others, stage, masked }): ReactElement => {
  const items: BreakdownItem[] = [
    { lab: '普通預金', v: futsu, c: 'var(--chart-1)' },
    ...(stage >= 2 ? [{ lab: 'つみたてNISA', v: 412300, c: 'var(--chart-2)' }] : []),
    { lab: '定期', v: 500000, c: 'var(--chart-4)' },
    ...(stage >= 3 ? [{ lab: '他行のこり', v: others, c: 'var(--chart-3)' }] : []),
  ];
  const total = items.reduce((s, x) => s + x.v, 0);

  return React.createElement('div', { className: 'v3-bd' },
    React.createElement('div', { className: 'v3-bd__bar' },
      items.map((x) =>
        React.createElement('i', {
          key: x.lab,
          style: { flex: x.v, background: x.c },
        })
      )
    ),
    React.createElement('div', { className: 'v3-bd__legend' },
      items.map((x) =>
        React.createElement('span', { key: x.lab },
          React.createElement('i', { style: { background: x.c } }),
          x.lab,
          ' ',
          React.createElement('b', null, masked ? '¥ •••' : '¥' + x.v.toLocaleString('ja-JP'))
        )
      )
    )
  );
};

interface StageNode {
  n: number;
  name: string;
  icon: FC<any>;
}

interface StagePathProps {
  stage: number;
  setStage: (n: number) => void;
  actual: number;
  seg: [number, number];
}

export const StagePath: FC<StagePathProps> = ({ stage, setStage, actual, seg }): ReactElement => {
  const nodes: StageNode[] = [
    { n: 1, name: 'みまもり', icon: V3_ICONS.eye },
    { n: 2, name: 'そだてる', icon: V3_ICONS.sprout },
    { n: 3, name: 'ひろげる', icon: V3_ICONS.target },
  ];

  return React.createElement('div', { className: 'v3-path' },
    nodes.map((nd, i) =>
      React.createElement(React.Fragment, { key: nd.n },
        i > 0 &&
        React.createElement('div', { className: 'v3-seg' },
          React.createElement('span', {
            className: 'v3-seg__f',
            style: { transform: `scaleX(${seg[i - 1]})` },
          })
        ),
        React.createElement('button', {
          className:
            'v3-node' +
            (nd.n < actual ? ' done' : '') +
            (nd.n === actual ? ' now' : '') +
            (nd.n === stage && stage !== actual ? ' view' : ''),
          onClick: () => setStage(nd.n),
          type: 'button',
          'aria-label': `${nd.name}ステージ`,
        },
          React.createElement('span', { className: 'v3-node__dot' },
            React.createElement(nd.icon, { width: 15, height: 15 })
          ),
          React.createElement('span', { className: 'v3-node__n' }, nd.name)
        )
      )
    )
  );
};

// Export for window scope (optional, for backwards compatibility)
if (typeof window !== 'undefined') {
  (window as any).V3Components = { Breakdown, StagePath };
}
