export function Page() {
  return (
    <>
      {/* Custom elements are intelligently collected by Root.js. */}
      <div style="height: 200px; display: flex; align-items: center; justify-content: center; background: #efefef; overflow: hidden">
        <gws-tooltip>
          <div slot="content">Tooltip prompt</div>
          <div slot="tooltip">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </gws-tooltip>
      </div>
    </>
  );
}

export default Page;
