/* V3 Tweaks — ステージ／表示モードの操作 */
const V3_DEFAULTS = /*EDITMODE-BEGIN*/{
  "stage": "そだてる（中級者）"
}/*EDITMODE-END*/;

const V3_STAGE_LABELS = ["みまもり（ビギナー）", "そだてる（中級者）", "ひろげる（ヘビー）"];

function V3TweaksApp() {
  const [t, setTweak] = useTweaks(V3_DEFAULTS);

  React.useEffect(() => {
    const n = V3_STAGE_LABELS.indexOf(t.stage) + 1;
    if (n >= 1 && window.HBV3 && window.HBV3.getStage() !== n) window.HBV3.setStage(n);
  }, [t.stage]);

  return (
    <TweaksPanel>
      <TweakSection label="エンドユーザー像" />
      <TweakRadio
        label="ステージ"
        value={t.stage}
        options={V3_STAGE_LABELS}
        onChange={(v) => setTweak("stage", v)}
      />
    </TweaksPanel>
  );
}

(function mountV3Tweaks() {
  const host = document.createElement("div");
  host.id = "v3-tweaks-root";
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<V3TweaksApp />);
})();
