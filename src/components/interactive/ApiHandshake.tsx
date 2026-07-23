"use client";

import { useState } from "react";

// One request, four possible answers. The harness asks a service's API for data;
// the service checks the request and the secret key, then answers with an HTTP
// status: 401 (who are you?), 404 (no such thing), 400 (that made no sense), or
// 200 (here you go). Only a well-formed request with a valid key opens the lock.
type Scenario = {
  id: string;
  label: string;
  req: string;
  auth: string;
  hasKey: boolean;
  status: number;
  statusText: string;
  detail: string;
  ok: boolean;
  data?: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "nokey",
    label: "Send with no key",
    req: "GET /calendar/v3/events",
    auth: "no key attached",
    hasKey: false,
    status: 401,
    statusText: "Unauthorized",
    detail:
      "The service has no idea who's asking. With no valid key, it refuses before doing any work at all.",
    ok: false,
  },
  {
    id: "wrongpath",
    label: "Ask for the wrong address",
    req: "GET /calendar/v3/evphemts",
    auth: "AIza·cal·••••",
    hasKey: true,
    status: 404,
    statusText: "Not Found",
    detail:
      "The key checks out, but that address doesn't exist — a typo'd or renamed endpoint. There's nothing there to return.",
    ok: false,
  },
  {
    id: "malformed",
    label: "Send a malformed request",
    req: "GET /calendar/v3/events?after=yesterday",
    auth: "AIza·cal·••••",
    hasKey: true,
    status: 400,
    statusText: "Bad Request",
    detail:
      "It arrived, but it doesn't make sense — a vague “yesterday” where an exact date was required. The service can't act on it.",
    ok: false,
  },
  {
    id: "valid",
    label: "Send with the key",
    req: "GET /calendar/v3/events?after=2026-07-23",
    auth: "AIza·cal·••••",
    hasKey: true,
    status: 200,
    statusText: "OK",
    detail:
      "Right address, well-formed request, valid key. The service unlocks and sends the data straight back.",
    ok: true,
    data: '3 events · "Office hours", "Dept. meeting", "Advising"',
  },
];

export function ApiHandshake() {
  const [pick, setPick] = useState<Scenario | null>(null);
  const [attempt, setAttempt] = useState(0);

  const send = (s: Scenario) => {
    setPick(s);
    setAttempt((n) => n + 1);
  };

  const unlocked = pick?.ok ?? false;

  return (
    <div className="interactive">
      <div className="interactive-head">
        <span className="label">Interactive · The handshake</span>
        <span className="kicker">one request, four possible answers</span>
      </div>
      <div className="interactive-body">
        <p className="hs-note">
          Try to fetch a calendar. The harness sends a request to the
          service&rsquo;s <strong>API</strong>; the service checks the request and
          the <strong>key</strong>, then answers with a status code. Only the last
          one opens the lock.
        </p>

        <div className="hs-buttons">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              className={`btn hs-btn ${pick?.id === s.id ? "is-active" : ""}`}
              aria-pressed={pick?.id === s.id}
              onClick={() => send(s)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="hs-wire" key={attempt}>
          <div className="hs-node hs-harness">
            <span className="hs-node-label">the harness</span>
            <span className="hs-node-sub">wants your events</span>
          </div>

          <div className="hs-channel">
            {pick && (
              <>
                <span className={`hs-packet hs-out ${unlocked ? "is-ok" : ""}`}>
                  <span className="hs-packet-req">{pick.req}</span>
                  <span className={`hs-packet-key ${pick.hasKey ? "" : "is-missing"}`}>
                    {pick.hasKey ? `🔑 ${pick.auth}` : `⌀ ${pick.auth}`}
                  </span>
                </span>
                <span
                  className={`hs-packet hs-back ${unlocked ? "is-ok" : "is-err"}`}
                >
                  <span className="hs-status">
                    {pick.status} {pick.statusText}
                  </span>
                </span>
              </>
            )}
            {!pick && <span className="hs-idle">— send a request —</span>}
          </div>

          <div className={`hs-node hs-service ${unlocked ? "is-open" : ""}`}>
            <span className="hs-lock" aria-hidden="true">
              {unlocked ? "🔓" : "🔒"}
            </span>
            <span className="hs-node-label">Calendar API</span>
            <span className="hs-node-sub">
              {unlocked ? "unlocked" : "guards the data"}
            </span>
          </div>
        </div>

        {pick && (
          <div className={`hs-result ${pick.ok ? "is-ok" : "is-err"}`} key={`r${attempt}`}>
            <span className="hs-result-code">
              {pick.status} {pick.statusText}
            </span>
            <p className="hs-result-detail">{pick.detail}</p>
            {pick.ok && pick.data && (
              <p className="hs-result-data">← {pick.data}</p>
            )}
          </div>
        )}
      </div>

      <style>{`
        .hs-note { margin: 0 0 1.25rem; font-size: 15px; color: var(--color-ink-soft); }
        .hs-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .hs-btn { font-size: 12px; }
        .hs-btn.is-active { background: var(--color-ink); color: var(--color-paper); border-color: var(--color-ink); }

        .hs-wire { display: grid; grid-template-columns: auto 1fr auto; align-items: stretch; gap: 0.75rem; }
        @media (max-width: 640px) { .hs-wire { grid-template-columns: 1fr; } }

        .hs-node { border: 1px solid var(--color-rule); background: var(--color-paper); padding: 0.85rem 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; gap: 0.2rem; min-width: 8.5rem; }
        .hs-harness { border-color: var(--color-ink); }
        .hs-node-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: var(--color-ink); }
        .hs-node-sub { font-size: 10px; font-style: italic; color: var(--color-ash); }
        .hs-service { position: relative; transition: border-color 200ms ease, background 200ms ease; }
        .hs-service.is-open { border-color: var(--color-gold); background: color-mix(in srgb, var(--color-gold) 8%, var(--color-paper)); }
        .hs-lock { font-size: 20px; line-height: 1; }

        .hs-channel { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 0.4rem; min-height: 5rem; padding: 0 0.25rem; border-top: 1px dashed var(--color-rule); border-bottom: 1px dashed var(--color-rule); }
        .hs-idle { text-align: center; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-ash); }

        .hs-packet { display: inline-flex; flex-direction: column; gap: 2px; border: 1px solid var(--color-ink); background: var(--color-paper); padding: 0.3rem 0.6rem; font-family: var(--font-mono); }
        .hs-out { align-self: flex-start; animation: hs-travel-out 520ms ease both; }
        .hs-back { align-self: flex-end; text-align: right; animation: hs-travel-back 520ms ease 420ms both; }
        .hs-out.is-ok { border-color: var(--color-gold); }
        .hs-back.is-ok { border-color: var(--color-gold); }
        .hs-back.is-err { border-color: var(--color-crimson); }
        .hs-packet-req { font-size: 10.5px; color: var(--color-ink); }
        .hs-packet-key { font-size: 10px; color: var(--color-gold); }
        .hs-packet-key.is-missing { color: var(--color-crimson); }
        .hs-status { font-size: 11px; font-weight: 600; }
        .hs-back.is-err .hs-status { color: var(--color-crimson); }
        .hs-back.is-ok .hs-status { color: var(--color-crimson-deep); }

        .hs-result { margin-top: 1.4rem; padding-left: 1rem; border-left: 3px solid var(--color-crimson); animation: hs-fade 300ms ease 780ms both; }
        .hs-result.is-ok { border-left-color: var(--color-gold); }
        .hs-result-code { font-family: var(--font-mono); font-size: 13px; font-weight: 600; color: var(--color-crimson); }
        .hs-result.is-ok .hs-result-code { color: var(--color-crimson-deep); }
        .hs-result-detail { margin: 0.35rem 0 0; font-size: 14.5px; line-height: 1.55; color: var(--color-ink); }
        .hs-result-data { margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 11.5px; color: var(--color-gold); }

        @keyframes hs-travel-out { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes hs-travel-back { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes hs-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .hs-out, .hs-back, .hs-result { animation: none; }
        }
      `}</style>
    </div>
  );
}
