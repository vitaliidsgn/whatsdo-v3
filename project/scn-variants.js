/* ============================================================
   WhatsDo — Scenario animation, 5 variants
   ============================================================ */
(function() {
  var section = document.getElementById('scn');
  if (!section) return;

  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tabs = section.querySelectorAll('.scn-tab');
  var panes = section.querySelectorAll('.scn-pane');
  var replayBtn = document.getElementById('scnReplay');

  /* ----------------------------------------------------------------
     Shared content (one scenario, reused inside each variant template)
     ---------------------------------------------------------------- */
  var SCN = {
    userMsg: "I need a good barber in downtown",
    aiMsg1: "I found a highly-rated spot near you with availability today:",
    aiMsg2: "Booked. You're confirmed for 3:30 PM today at Classic Cuts. Confirmation sent to your email and to the shop's calendar.",
    venue: { name: "Classic Cuts Barbershop", meta: "Barbershop · $$ · 0.4 mi", rating: "★ 4.8" },
    slots: ["2:00 PM", "3:30 PM", "4:15 PM"],
    selectedSlot: 1, // index
    procSteps: [
      "Checking availability",
      "Holding the slot",
      "Charging $45 via Stripe",
      "Syncing with Square POS"
    ],
    bookingId: "BR-7841",
    confirmRows: ["Today · 3:30 PM", "$45 paid · Stripe", "Synced to shop's calendar"]
  };

  /* ----------------------------------------------------------------
     Reusable HTML snippets
     ---------------------------------------------------------------- */
  function bubbleUser(text) {
    return '<div class="scn-msg scn-msg-user" data-el="msg-user">' + text + '</div>';
  }
  function bubbleAi(text, key) {
    return '<div class="scn-msg scn-msg-ai" data-el="' + key + '">' + text + '</div>';
  }
  function typingDots() {
    return '<div class="scn-typing" data-el="typing"><span></span><span></span><span></span></div>';
  }
  function venueCard() {
    var slotsHtml = SCN.slots.map(function(s, i) {
      return '<div class="scn-slot" data-slot="' + i + '">' + s + '</div>';
    }).join('');
    return '' +
      '<div class="scn-card" data-el="card">' +
        '<div class="scn-card-head">' +
          '<div>' +
            '<div class="scn-card-title">' + SCN.venue.name + '</div>' +
            '<div class="scn-card-meta">' + SCN.venue.meta + '</div>' +
          '</div>' +
          '<div class="scn-card-rating">' + SCN.venue.rating + '</div>' +
        '</div>' +
        '<div class="scn-card-slots">' + slotsHtml + '</div>' +
        '<button class="scn-card-cta" data-el="cta" type="button">' +
          '<span class="scn-spin"></span>' +
          '<span class="scn-cta-label">Book Now →</span>' +
        '</button>' +
      '</div>';
  }
  function procBlock() {
    var rows = SCN.procSteps.map(function(s, i) {
      return '' +
        '<div class="scn-proc-row" data-proc-row="' + (i + 1) + '">' +
          '<span class="scn-proc-dot">' +
            '<svg class="scn-proc-check" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          '<span>' + s + '</span>' +
        '</div>';
    }).join('');
    return '' +
      '<div class="scn-proc" data-el="proc">' +
        '<div class="scn-proc-head">' +
          '<span class="scn-proc-label">' +
            '<span class="scn-proc-bolt">⚡</span>' +
            '<span class="scn-proc-label-text">Processing via WhatsDo</span>' +
          '</span>' +
          '<span class="scn-proc-timer" data-el="timer">1.8s</span>' +
        '</div>' +
        '<div class="scn-proc-rows">' + rows + '</div>' +
      '</div>';
  }
  function confirmCard() {
    var rows = SCN.confirmRows.map(function(r) { return '<div>' + r + '</div>'; }).join('');
    return '' +
      '<div class="scn-confirm" data-el="confirm">' +
        '<div class="scn-confirm-head">' +
          '<span class="scn-confirm-check">' +
            '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          'Booking #' + SCN.bookingId +
        '</div>' +
        '<div class="scn-confirm-rows">' + rows + '</div>' +
      '</div>';
  }

  /* ----------------------------------------------------------------
     VARIANT 1 — Composition canvas
     ---------------------------------------------------------------- */
  function buildV1(pane) {
    pane.innerHTML = '' +
      '<div class="scn-comp">' +
        '<div class="scn-comp-slot scn-comp-slot--ul" data-el="slot-ul">' +
          bubbleUser(SCN.userMsg) +
        '</div>' +
        '<div class="scn-comp-slot scn-comp-slot--bl" data-el="slot-bl">' +
          bubbleAi(SCN.aiMsg1, "msg-ai-1") +
        '</div>' +
        '<div class="scn-comp-slot scn-comp-slot--center" data-el="slot-center">' +
          venueCard() +
        '</div>' +
        '<div class="scn-comp-slot scn-comp-slot--ur" data-el="slot-ur">' +
          procBlock() +
        '</div>' +
        '<div class="scn-comp-slot scn-comp-slot--br" data-el="slot-br">' +
          confirmCard() +
        '</div>' +
        '<svg class="scn-comp-lines" data-el="lines" viewBox="0 0 1000 600" preserveAspectRatio="none">' +
          '<path d="M180 130 Q 340 180, 500 280" class="scn-line" data-line="1"/>' +
          '<path d="M180 470 Q 340 420, 500 320" class="scn-line" data-line="2"/>' +
          '<path d="M500 280 Q 660 180, 820 130" class="scn-line" data-line="3"/>' +
          '<path d="M500 320 Q 660 420, 820 470" class="scn-line" data-line="4"/>' +
        '</svg>' +
      '</div>';
  }

  function playV1(pane) {
    var $ = function(s) { return pane.querySelector(s); };
    var $$ = function(s) { return pane.querySelectorAll(s); };

    function reset() {
      $$('.scn-comp-slot').forEach(function(el) { el.classList.remove('is-in', 'is-active'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.remove('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) {
        cta.classList.remove('is-press', 'is-loading');
        var lbl = cta.querySelector('.scn-cta-label'); if (lbl) lbl.textContent = 'Book Now →';
      }
      $$('.scn-proc-row').forEach(function(r) { r.classList.remove('is-in', 'is-done'); });
      var timer = $('[data-el="timer"]'); if (timer) timer.classList.remove('is-in');
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.remove('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = 'Processing via WhatsDo';
      $$('.scn-line').forEach(function(l) { l.classList.remove('is-in'); });
    }

    function showFinal() {
      $$('.scn-comp-slot').forEach(function(el) { el.classList.add('is-in'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) {
        var lbl = cta.querySelector('.scn-cta-label'); if (lbl) lbl.textContent = 'Booked ✓';
      }
      $$('.scn-proc-row').forEach(function(r) { r.classList.add('is-in', 'is-done'); });
      var timer = $('[data-el="timer"]'); if (timer) timer.classList.add('is-in');
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.add('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = '✓ Processed via WhatsDo · 1.8s';
      $$('.scn-line').forEach(function(l) { l.classList.add('is-in'); });
    }

    var timeouts = [];
    function s(fn, t) { timeouts.push(setTimeout(fn, t)); }
    function clearAll() { timeouts.forEach(clearTimeout); timeouts = []; }

    return {
      play: function() {
        clearAll(); reset();
        if (prefersReduce) { showFinal(); return; }
        s(function() { $('[data-el="slot-ul"]').classList.add('is-in'); }, 200);
        s(function() { $('[data-el="slot-bl"]').classList.add('is-in'); }, 2500);
        s(function() { $('[data-el="slot-center"]').classList.add('is-in'); }, 4000);
        s(function() { var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected'); }, 4700);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.add('is-press');
        }, 5500);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-press'); cta.classList.add('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booking…';
        }, 5650);
        s(function() { $('[data-el="slot-ur"]').classList.add('is-in'); }, 6000);
        var rows = $$('.scn-proc-row');
        var rowTimes = [6000, 6700, 7400, 8100];
        rows.forEach(function(row, i) {
          s(function() { row.classList.add('is-in'); }, rowTimes[i]);
          s(function() { row.classList.add('is-done'); }, rowTimes[i] + 300);
        });
        s(function() { $('[data-el="timer"]').classList.add('is-in'); }, 8800);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
        }, 9700);
        s(function() { $('[data-el="slot-br"]').classList.add('is-in'); }, 10000);
        // Connecting lines
        var lines = $$('.scn-line');
        s(function() { if (lines[0]) lines[0].classList.add('is-in'); }, 11000);
        s(function() { if (lines[1]) lines[1].classList.add('is-in'); }, 11200);
        s(function() { if (lines[2]) lines[2].classList.add('is-in'); }, 11400);
        s(function() { if (lines[3]) lines[3].classList.add('is-in'); }, 11600);
      },
      stop: function() { clearAll(); }
    };
  }

  /* ----------------------------------------------------------------
     VARIANT 2 — Vertical chat thread
     ---------------------------------------------------------------- */
  function buildV2(pane) {
    pane.innerHTML = '' +
      '<div class="scn-chat">' +
        bubbleUser(SCN.userMsg) +
        typingDots() +
        bubbleAi(SCN.aiMsg1, "msg-ai-1") +
        venueCard() +
        procBlock() +
        bubbleAi(SCN.aiMsg2, "msg-ai-2") +
        confirmCard() +
      '</div>';
  }

  function playV2(pane) {
    var $ = function(s) { return pane.querySelector(s); };
    var $$ = function(s) { return pane.querySelectorAll(s); };

    function reset() {
      ['msg-user','typing','msg-ai-1','card','proc','msg-ai-2','confirm','timer'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.remove('is-in');
      });
      $$('.scn-proc-row').forEach(function(r) { r.classList.remove('is-in', 'is-done'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.remove('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) {
        cta.classList.remove('is-press', 'is-loading');
        cta.querySelector('.scn-cta-label').textContent = 'Book Now →';
      }
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.remove('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = 'Processing via WhatsDo';
    }

    function showFinal() {
      ['msg-user','msg-ai-1','card','proc','msg-ai-2','confirm','timer'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.add('is-in');
      });
      $$('.scn-proc-row').forEach(function(r) { r.classList.add('is-in', 'is-done'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected');
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.add('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = '✓ Processed via WhatsDo · 1.8s';
      var cta = $('[data-el="cta"]'); if (cta) cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
    }

    var timeouts = [];
    function s(fn, t) { timeouts.push(setTimeout(fn, t)); }
    function clearAll() { timeouts.forEach(clearTimeout); timeouts = []; }

    return {
      play: function() {
        clearAll(); reset();
        if (prefersReduce) { showFinal(); return; }
        s(function() { $('[data-el="msg-user"]').classList.add('is-in'); }, 200);
        s(function() { $('[data-el="typing"]').classList.add('is-in'); }, 1500);
        s(function() {
          $('[data-el="typing"]').classList.remove('is-in');
          $('[data-el="msg-ai-1"]').classList.add('is-in');
        }, 2500);
        s(function() { $('[data-el="card"]').classList.add('is-in'); }, 4000);
        s(function() { var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected'); }, 4700);
        s(function() { $('[data-el="cta"]').classList.add('is-press'); }, 5500);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-press'); cta.classList.add('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booking…';
        }, 5650);
        s(function() { $('[data-el="proc"]').classList.add('is-in'); }, 6000);
        var rows = $$('.scn-proc-row');
        var rowTimes = [6000, 7000, 8000, 8700];
        rows.forEach(function(row, i) {
          s(function() { row.classList.add('is-in'); }, rowTimes[i]);
          s(function() { row.classList.add('is-done'); }, rowTimes[i] + 300);
        });
        s(function() { $('[data-el="timer"]').classList.add('is-in'); }, 9000);
        s(function() {
          $('[data-el="proc"]').classList.add('is-collapsed');
          pane.querySelector('.scn-proc-label-text').textContent = '✓ Processed via WhatsDo · 1.8s';
        }, 9200);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
        }, 9700);
        s(function() { $('[data-el="msg-ai-2"]').classList.add('is-in'); }, 9900);
        s(function() { $('[data-el="confirm"]').classList.add('is-in'); }, 11000);
      },
      stop: function() { clearAll(); }
    };
  }

  /* ----------------------------------------------------------------
     VARIANT 3 — Three-pane horizontal flow
     ---------------------------------------------------------------- */
  function buildV3(pane) {
    pane.innerHTML = '' +
      '<div class="scn-flow">' +
        '<div class="scn-flow-col" data-col="1">' +
          '<div class="scn-flow-label">Customer</div>' +
          '<div class="scn-flow-stack">' +
            bubbleUser(SCN.userMsg) +
            bubbleAi(SCN.aiMsg1, "msg-ai-1") +
            venueCard() +
          '</div>' +
        '</div>' +
        '<div class="scn-flow-arrow" data-arrow="1">' +
          '<svg width="32" height="14" viewBox="0 0 32 14" fill="none"><path d="M2 7H29M29 7L23 2M29 7L23 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<div class="scn-flow-col" data-col="2">' +
          '<div class="scn-flow-label">WhatsDo</div>' +
          '<div class="scn-flow-stack scn-flow-stack--center">' +
            procBlock() +
          '</div>' +
        '</div>' +
        '<div class="scn-flow-arrow" data-arrow="2">' +
          '<svg width="32" height="14" viewBox="0 0 32 14" fill="none"><path d="M2 7H29M29 7L23 2M29 7L23 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<div class="scn-flow-col" data-col="3">' +
          '<div class="scn-flow-label">Outcome</div>' +
          '<div class="scn-flow-stack">' +
            bubbleAi(SCN.aiMsg2, "msg-ai-2") +
            confirmCard() +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function playV3(pane) {
    var $ = function(s) { return pane.querySelector(s); };
    var $$ = function(s) { return pane.querySelectorAll(s); };
    var cols = $$('.scn-flow-col');
    var arrows = $$('.scn-flow-arrow');

    function reset() {
      cols.forEach(function(c) { c.classList.remove('is-active'); c.classList.add('is-dim'); });
      arrows.forEach(function(a) { a.classList.remove('is-on'); });
      ['msg-user','msg-ai-1','card','proc','msg-ai-2','confirm','timer'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.remove('is-in');
      });
      $$('.scn-proc-row').forEach(function(r) { r.classList.remove('is-in', 'is-done'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.remove('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) {
        cta.classList.remove('is-press', 'is-loading');
        cta.querySelector('.scn-cta-label').textContent = 'Book Now →';
      }
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.remove('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = 'Processing via WhatsDo';
    }

    function showFinal() {
      cols.forEach(function(c) { c.classList.remove('is-dim'); });
      arrows.forEach(function(a) { a.classList.add('is-on'); });
      ['msg-user','msg-ai-1','card','proc','msg-ai-2','confirm','timer'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.add('is-in');
      });
      $$('.scn-proc-row').forEach(function(r) { r.classList.add('is-in', 'is-done'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
      var proc = $('[data-el="proc"]'); if (proc) proc.classList.add('is-collapsed');
      var lblTxt = pane.querySelector('.scn-proc-label-text'); if (lblTxt) lblTxt.textContent = '✓ Processed via WhatsDo · 1.8s';
    }

    var timeouts = [];
    function s(fn, t) { timeouts.push(setTimeout(fn, t)); }
    function clearAll() { timeouts.forEach(clearTimeout); timeouts = []; }

    return {
      play: function() {
        clearAll(); reset();
        if (prefersReduce) { showFinal(); return; }

        // Col 1 active
        s(function() { cols[0].classList.add('is-active'); cols[0].classList.remove('is-dim'); }, 100);
        s(function() { $('[data-el="msg-user"]').classList.add('is-in'); }, 300);
        s(function() { $('[data-el="msg-ai-1"]').classList.add('is-in'); }, 1800);
        s(function() { $('[data-el="card"]').classList.add('is-in'); }, 3300);
        s(function() { var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected'); }, 4200);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.add('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booking…';
        }, 5000);

        // Arrow 1, col 2
        s(function() { arrows[0].classList.add('is-on'); cols[0].classList.remove('is-active'); }, 5500);
        s(function() { cols[1].classList.add('is-active'); cols[1].classList.remove('is-dim'); }, 5600);
        s(function() { $('[data-el="proc"]').classList.add('is-in'); }, 6000);
        var rows = $$('.scn-proc-row');
        var rowTimes = [6200, 6900, 7600, 8300];
        rows.forEach(function(row, i) {
          s(function() { row.classList.add('is-in'); }, rowTimes[i]);
          s(function() { row.classList.add('is-done'); }, rowTimes[i] + 300);
        });
        s(function() { $('[data-el="timer"]').classList.add('is-in'); }, 9000);

        // Arrow 2, col 3
        s(function() {
          arrows[1].classList.add('is-on');
          cols[1].classList.remove('is-active');
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
        }, 9300);
        s(function() { cols[2].classList.add('is-active'); cols[2].classList.remove('is-dim'); }, 9500);
        s(function() { $('[data-el="msg-ai-2"]').classList.add('is-in'); }, 9800);
        s(function() { $('[data-el="confirm"]').classList.add('is-in'); }, 11000);
        // Final: un-dim everything
        s(function() {
          cols.forEach(function(c) { c.classList.remove('is-dim'); c.classList.remove('is-active'); });
        }, 12000);
      },
      stop: function() { clearAll(); }
    };
  }

  /* ----------------------------------------------------------------
     VARIANT 4 — Timeline-driven
     ---------------------------------------------------------------- */
  var V4_STAGES = [
    { id: "request", label: "Request" },
    { id: "match",   label: "Match" },
    { id: "pay",     label: "Pay" },
    { id: "confirm", label: "Confirm" },
    { id: "sync",    label: "Sync" }
  ];

  function buildV4(pane) {
    var dotsHtml = V4_STAGES.map(function(st, i) {
      return '' +
        '<button type="button" class="scn-tl-dot" data-stage="' + i + '" aria-label="' + st.label + '">' +
          '<span class="scn-tl-bullet"></span>' +
          '<span class="scn-tl-name">' + st.label + '</span>' +
        '</button>';
    }).join('');

    pane.innerHTML = '' +
      '<div class="scn-tl">' +
        '<div class="scn-tl-stage" data-el="tl-stage">' +
          // Stage 1: Request
          '<div class="scn-tl-scene" data-stage-scene="0">' +
            '<div class="scn-tl-stack">' +
              bubbleUser(SCN.userMsg) +
              typingDots() +
            '</div>' +
          '</div>' +
          // Stage 2: Match
          '<div class="scn-tl-scene" data-stage-scene="1">' +
            '<div class="scn-tl-stack">' +
              venueCard() +
            '</div>' +
          '</div>' +
          // Stage 3: Pay
          '<div class="scn-tl-scene" data-stage-scene="2">' +
            '<div class="scn-tl-pay">' +
              '<div class="scn-tl-pay-row">' +
                '<span class="scn-tl-pay-icon">' +
                  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 6h12v8H3z M3 9h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
                '</span>' +
                '<div>' +
                  '<div class="scn-tl-pay-amt">$45 charged</div>' +
                  '<div class="scn-tl-pay-meta">via Stripe · approved</div>' +
                '</div>' +
                '<span class="scn-tl-pay-check">' +
                  '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          // Stage 4: Confirm
          '<div class="scn-tl-scene" data-stage-scene="3">' +
            '<div class="scn-tl-stack">' +
              bubbleAi(SCN.aiMsg2, "msg-ai-2") +
            '</div>' +
          '</div>' +
          // Stage 5: Sync
          '<div class="scn-tl-scene" data-stage-scene="4">' +
            '<div class="scn-tl-sync">' +
              '<div class="scn-tl-sync-row">' +
                '<span class="scn-tl-sync-icon">' +
                  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4v4h-4M4 14v-4h4M5 6a5 5 0 0 1 8.5-1M13 12a5 5 0 0 1-8.5 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</span>' +
                'Synced with Square POS' +
              '</div>' +
              confirmCard() +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="scn-tl-bar">' +
          '<div class="scn-tl-line"><span class="scn-tl-line-fill" data-el="tl-fill"></span></div>' +
          '<div class="scn-tl-dots">' + dotsHtml + '</div>' +
        '</div>' +
      '</div>';
  }

  function playV4(pane) {
    var $ = function(s) { return pane.querySelector(s); };
    var $$ = function(s) { return pane.querySelectorAll(s); };
    var dots = $$('.scn-tl-dot');
    var scenes = $$('.scn-tl-scene');
    var fill = $('[data-el="tl-fill"]');

    function setStage(idx) {
      dots.forEach(function(d, i) { d.classList.toggle('is-on', i <= idx); });
      scenes.forEach(function(s, i) { s.classList.toggle('is-active', i === idx); });
      // Fill width: 0%, 25%, 50%, 75%, 100%
      var pct = (idx / (V4_STAGES.length - 1)) * 100;
      if (fill) fill.style.width = pct + '%';
    }

    function reset() {
      dots.forEach(function(d) { d.classList.remove('is-on'); });
      scenes.forEach(function(s) { s.classList.remove('is-active'); });
      if (fill) fill.style.width = '0%';
    }

    function showFinal() {
      dots.forEach(function(d) { d.classList.add('is-on'); });
      // Final scene = last (sync, with confirmation card)
      scenes.forEach(function(sc, i) { sc.classList.toggle('is-active', i === scenes.length - 1); });
      if (fill) fill.style.width = '100%';
    }

    var timeouts = [];
    function s(fn, t) { timeouts.push(setTimeout(fn, t)); }
    function clearAll() { timeouts.forEach(clearTimeout); timeouts = []; }

    // Click on dots to jump
    dots.forEach(function(d, i) {
      d.addEventListener('click', function() {
        clearAll();
        setStage(i);
      });
    });

    return {
      play: function() {
        clearAll(); reset();
        if (prefersReduce) { showFinal(); return; }
        s(function() { setStage(0); }, 100);
        s(function() { setStage(1); }, 2500);
        s(function() { setStage(2); }, 5000);
        s(function() { setStage(3); }, 7000);
        s(function() { setStage(4); }, 9000);
      },
      stop: function() { clearAll(); }
    };
  }

  /* ----------------------------------------------------------------
     VARIANT 5 — Split-screen (chat + dev console)
     ---------------------------------------------------------------- */
  var V5_LOGS = [
    "REQUEST received from ChatGPT",
    "QUERY: \"barber, downtown\"",
    "MATCH: Classic Cuts Barbershop · 0.4 mi",
    "HOLD slot 3:30 PM · 0.4s",
    "CHARGE $45 via Stripe · approved",
    "SYNC to Square POS · success",
    "CONFIRMATION sent · #BR-7841"
  ];

  function buildV5(pane) {
    var logsHtml = V5_LOGS.map(function(line, i) {
      return '<div class="scn-log-line" data-log="' + i + '"><span class="scn-log-prompt">&gt;</span> ' + line + '</div>';
    }).join('');

    pane.innerHTML = '' +
      '<div class="scn-split">' +
        '<div class="scn-split-left">' +
          '<div class="scn-chat scn-chat--split">' +
            bubbleUser(SCN.userMsg) +
            typingDots() +
            bubbleAi(SCN.aiMsg1, "msg-ai-1") +
            venueCard() +
            bubbleAi(SCN.aiMsg2, "msg-ai-2") +
            confirmCard() +
          '</div>' +
        '</div>' +
        '<div class="scn-split-right">' +
          '<div class="scn-log-head">' +
            '<span class="scn-log-dots"><span></span><span></span><span></span></span>' +
            '<span>whatsdo · events</span>' +
          '</div>' +
          '<div class="scn-log-body">' + logsHtml + '<span class="scn-log-cursor" data-el="cursor">_</span></div>' +
        '</div>' +
      '</div>';
  }

  function playV5(pane) {
    var $ = function(s) { return pane.querySelector(s); };
    var $$ = function(s) { return pane.querySelectorAll(s); };

    function reset() {
      ['msg-user','typing','msg-ai-1','card','msg-ai-2','confirm'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.remove('is-in');
      });
      $$('.scn-log-line').forEach(function(l) { l.classList.remove('is-in'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.remove('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) {
        cta.classList.remove('is-loading');
        cta.querySelector('.scn-cta-label').textContent = 'Book Now →';
      }
    }

    function showFinal() {
      ['msg-user','msg-ai-1','card','msg-ai-2','confirm'].forEach(function(k) {
        var el = $('[data-el="' + k + '"]'); if (el) el.classList.add('is-in');
      });
      $$('.scn-log-line').forEach(function(l) { l.classList.add('is-in'); });
      var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected');
      var cta = $('[data-el="cta"]'); if (cta) cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
    }

    var timeouts = [];
    function s(fn, t) { timeouts.push(setTimeout(fn, t)); }
    function clearAll() { timeouts.forEach(clearTimeout); timeouts = []; }
    var logs = $$('.scn-log-line');

    return {
      play: function() {
        clearAll(); reset();
        if (prefersReduce) { showFinal(); return; }

        // Left side timing aligned w/ V2
        s(function() { $('[data-el="msg-user"]').classList.add('is-in'); }, 200);
        s(function() { if (logs[0]) logs[0].classList.add('is-in'); }, 400);
        s(function() { if (logs[1]) logs[1].classList.add('is-in'); }, 1300);
        s(function() { $('[data-el="typing"]').classList.add('is-in'); }, 1500);
        s(function() {
          $('[data-el="typing"]').classList.remove('is-in');
          $('[data-el="msg-ai-1"]').classList.add('is-in');
        }, 2500);
        s(function() { $('[data-el="card"]').classList.add('is-in'); }, 4000);
        s(function() { if (logs[2]) logs[2].classList.add('is-in'); }, 4200);
        s(function() { var slots = $$('.scn-slot'); if (slots[1]) slots[1].classList.add('is-selected'); }, 4700);
        s(function() { if (logs[3]) logs[3].classList.add('is-in'); }, 5500);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.add('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booking…';
        }, 5800);
        s(function() { if (logs[4]) logs[4].classList.add('is-in'); }, 7000);
        s(function() { if (logs[5]) logs[5].classList.add('is-in'); }, 8200);
        s(function() {
          var cta = $('[data-el="cta"]'); cta.classList.remove('is-loading');
          cta.querySelector('.scn-cta-label').textContent = 'Booked ✓';
        }, 9300);
        s(function() { $('[data-el="msg-ai-2"]').classList.add('is-in'); }, 9500);
        s(function() { if (logs[6]) logs[6].classList.add('is-in'); }, 10500);
        s(function() { $('[data-el="confirm"]').classList.add('is-in'); }, 11000);
      },
      stop: function() { clearAll(); }
    };
  }

  /* ----------------------------------------------------------------
     Wire up tabs
     ---------------------------------------------------------------- */
  var builders = { 1: buildV1, 2: buildV2, 3: buildV3, 4: buildV4, 5: buildV5 };
  var players  = { 1: playV1,  2: playV2,  3: playV3,  4: playV4,  5: playV5 };
  var instances = {};

  panes.forEach(function(pane) {
    var key = pane.getAttribute('data-pane');
    if (builders[key]) builders[key](pane);
    if (players[key]) instances[key] = players[key](pane);
  });

  var current = '1';

  function activate(key, replay) {
    if (instances[current] && instances[current].stop) instances[current].stop();

    panes.forEach(function(p) { p.classList.toggle('is-active', p.getAttribute('data-pane') === key); });
    tabs.forEach(function(t) {
      var on = t.getAttribute('data-pane') === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    current = key;
    if (instances[key] && instances[key].play) instances[key].play();
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var key = tab.getAttribute('data-pane');
      if (key !== current) activate(key);
      else if (instances[key]) instances[key].play(); // re-click replays
    });
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', function() {
      if (instances[current] && instances[current].play) instances[current].play();
    });
  }

  /* IntersectionObserver — start V1 on first view */
  var played = false;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !played) {
          played = true;
          if (instances[current] && instances[current].play) instances[current].play();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(section);
  } else {
    setTimeout(function() {
      if (instances[current] && instances[current].play) instances[current].play();
    }, 500);
  }
})();
