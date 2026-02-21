const vxTritonTabButtons = document.querySelectorAll(
    ".vx-triton-tabs-btn"
  );

  const vxTritonTabPanels = document.querySelectorAll(
    ".vx-triton-tabs-panel"
  );

  vxTritonTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabKey = btn.dataset.vxTritonTab;

      vxTritonTabButtons.forEach(b =>
        b.classList.remove("is-active")
      );
      vxTritonTabPanels.forEach(p =>
        p.classList.remove("is-active")
      );

      btn.classList.add("is-active");
      document
        .getElementById(`vx-triton-panel-${tabKey}`)
        .classList.add("is-active");
    });
  });