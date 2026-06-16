import React, { useEffect, useState } from "react";

const NEW_LINK = "https://bigflixv2.vercel.app/";
const REDIRECT_SECONDS = 6;

function UpdateRedirect() {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      window.location.replace(NEW_LINK);
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.content}>
        <div style={styles.logo}>BIGFLIX</div>

        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          App updated
        </div>

        <h1 style={styles.title}>
          This app has been <span style={styles.titleAccent}>updated</span>.
        </h1>

        <p style={styles.subtitle}>
          You'll be redirected to the new BIGFLIX in a moment.
        </p>

        <a href={NEW_LINK} style={styles.button}>
          Go to the new BIGFLIX
          <span style={styles.arrow}>›</span>
        </a>

        <div style={styles.countdown}>
          Redirecting in <span style={styles.countNum}>{seconds}</span>
          {seconds === 1 ? " second" : " seconds"}…
        </div>

        <a href={NEW_LINK} style={styles.link}>
          {NEW_LINK}
        </a>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background:
      "radial-gradient(120% 120% at 50% 0%, #1a0d10 0%, #0b0708 45%, #000000 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
    overflow: "hidden",
    padding: "24px",
    boxSizing: "border-box",
  },
  glowTop: {
    position: "absolute",
    top: "-30%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "700px",
    background:
      "radial-gradient(circle, rgba(229,9,20,0.28) 0%, rgba(229,9,20,0) 70%)",
    pointerEvents: "none",
  },
  glowBottom: {
    position: "absolute",
    bottom: "-40%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "900px",
    height: "600px",
    background:
      "radial-gradient(circle, rgba(229,9,20,0.12) 0%, rgba(229,9,20,0) 70%)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    textAlign: "center",
    maxWidth: "560px",
    width: "100%",
  },
  logo: {
    color: "#e50914",
    fontWeight: 900,
    fontSize: "34px",
    letterSpacing: "1px",
    marginBottom: "36px",
    textShadow: "0 0 24px rgba(229,9,20,0.5)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(229,9,20,0.4)",
    background: "rgba(229,9,20,0.1)",
    color: "#ff6b73",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "24px",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#e50914",
    boxShadow: "0 0 10px rgba(229,9,20,0.9)",
  },
  title: {
    fontSize: "40px",
    lineHeight: 1.15,
    fontWeight: 800,
    margin: "0 0 16px",
  },
  titleAccent: {
    color: "#e50914",
  },
  subtitle: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.65)",
    margin: "0 0 32px",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#e50914",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 700,
    boxShadow: "0 8px 30px rgba(229,9,20,0.45)",
    transition: "transform 0.15s ease",
  },
  arrow: {
    fontSize: "20px",
    lineHeight: 1,
  },
  countdown: {
    marginTop: "28px",
    fontSize: "14px",
    color: "rgba(255,255,255,0.55)",
  },
  countNum: {
    color: "#ffffff",
    fontWeight: 700,
  },
  link: {
    display: "block",
    marginTop: "10px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    wordBreak: "break-all",
  },
};

export default UpdateRedirect;
