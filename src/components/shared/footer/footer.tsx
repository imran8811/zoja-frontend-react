import React, { FC } from "react";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-wrap pt-3 pb-3">
      <p className="text-center mb-0">&copy;Zoja Matrimonial Services, All Rights Reserved {currentYear}</p>
    </footer>
  )
}

export default Footer;