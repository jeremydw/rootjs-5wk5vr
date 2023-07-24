export function Page() {
  return (
    <>
      {/* Ensure undefined popovers are hidden. */}
      <style>
        {`
          gws-popover:not(:defined) {
            display: none;
          }
        `}
      </style>
      <div style="height: 200px; display: flex; align-items: center; justify-content: center; background: #efefef; overflow: hidden;">
        <gws-tooltip offset="10">
          Learn about plans
          <gws-popover slot="popover" label="Plan details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </gws-popover>
        </gws-tooltip>
      </div>
    </>
  );
}

export default Page;
