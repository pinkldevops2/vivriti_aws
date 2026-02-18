// src/components/ContactButton.jsx
import PropTypes from "prop-types";
import LogoShape from "../../../public/Vivrithi_logo.svg";

export default function ContactButton({ label = "GET IN TOUCH", href = "/contact-us#leadgen", width = "" }) {
  return (
    <a
      href={href}
      className={`contact_cta getintouch-fix flex items-center gap-2 text-[14px] 
              text-white uppercase hover:text-blue-600 transition mb-2 right-0 
              ${width ? `w-[${width}px]` : ""}`}
    >
      <span data-text={label}>{label}</span>
      <img src={LogoShape.src} alt="Vivrithi" className="w-5 h-5" />
    </a>
  );
}

// PropTypes validation
ContactButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
