"use client";

import { useEffect } from "react";

const BootstrapJS = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return null;
};

export default BootstrapJS;
