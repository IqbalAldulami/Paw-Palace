// PawPalace JS — gallery filter, simple form validation, and details toggles
document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------
  // Breed filter (dropdown)
  // -------------------------------
  var select  = document.getElementById('breedFilter');
  var gallery = document.getElementById('available');

  if (select && gallery) {
    var cards = Array.prototype.slice.call(gallery.querySelectorAll('.card'));

    // Collect breeds from data-breed to build the dropdown (keep "All" first)
    var breedsSet = new Set();
    for (var i = 0; i < cards.length; i++) {
      var b = (cards[i].dataset && cards[i].dataset.breed) ? cards[i].dataset.breed.trim() : '';
      if (b) breedsSet.add(b);
    }
    var breeds = Array.from(breedsSet).sort();
    select.innerHTML =
      '<option value="all">All</option>' +
      breeds.map(function (b) {
        return '<option value="' + b.toLowerCase() + '">' + b + '</option>';
      }).join('');

    // Filter cards when selection changes
    select.addEventListener('change', function () {
      var val = (select.value || 'all').toLowerCase();
      for (var i = 0; i < cards.length; i++) {
        var breed = (cards[i].dataset.breed || '').toLowerCase().trim();
        cards[i].style.display = (val === 'all' || breed === val) ? '' : 'none';
      }
    });
  }

  // -------------------------------
  // Adopt form validation (adopt.html)
  // -------------------------------
  var form = document.getElementById('adoptForm');
  if (form) {
    // Prefill cat name from ?cat= if present (optional)
    var catInput = document.getElementById('cat');
    if (catInput) {
      var params = new URLSearchParams(window.location.search);
      var q = params.get('cat');
      if (q && !catInput.value) catInput.value = q;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Demo only, no backend

      var errors = [];
      var full  = document.getElementById('fullname');
      var mail  = document.getElementById('email');
      var phone = document.getElementById('phone');

      // Validate: name must not be empty
      if (!full || !full.value || full.value.trim().length === 0) {
        errors.push('Please enter your full name.');
      }

      // Validate: email format
      var emailVal = mail && mail.value ? mail.value.trim() : '';
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (!emailOk) errors.push('Please enter a valid email.');

      // Validate: phone starts with 05 and has 10 digits
      var phoneVal = phone && phone.value ? phone.value.trim() : '';
      var phoneOk = /^05\d{8}$/.test(phoneVal);
      if (!phoneOk) errors.push('Phone must start with 05 and be 10 digits.');

      if (errors.length) {
        alert(errors.join('\n'));
        return;
      }

      alert('Your adoption request was sent successfully!');
      window.location.href = 'index.html';
    });
  }

  // -------------------------------
  // Cat Details & Reason (no inline styles)
  // -------------------------------
  (function () {
    var section = document.getElementById('personality-section');
    if (!section) return;

    // Static demo data for cat traits and adoption reason
    var CAT_INFO = {
      Mishmish: {
        personality: "Playful and curious.",
        health: "Healthy kitten with no issues.",
        vaccinated: "Not yet vaccinated.",
        reason: "Owner moved to a pet-free apartment."
      },
      Simba: {
        personality: "Energetic and social.",
        health: "In great health.",
        vaccinated: "Received one vaccination so far.",
        reason: "Rescued from foster care."
      },
      Nala: {
        personality: "Calm and gentle.",
        health: "Excellent health.",
        vaccinated: "Fully vaccinated.",
        reason: "Owner developed allergies."
      }
    };

    // Derive cat name from heading (before the en dash "–")
    var h = document.querySelector('.cat-name');
    var name = h && h.textContent ? h.textContent.split('–')[0].trim() : '';
    if (!name || !CAT_INFO[name]) return;

    var info = CAT_INFO[name];

    section.innerHTML =
      '<h3 class="section-title">Cat Details & Reason</h3>' +
      '<div class="btn-row">' +
      '  <button type="button" id="btnDetails" class="btn">🐾 Cat Details</button>' +
      '  <button type="button" id="btnReason"  class="btn btn-secondary">💛 Reason for Adoption</button>' +
      '</div>' +
      '<div id="catInfoBox" class="callout mt-8"></div>';

    var box  = document.getElementById('catInfoBox');
    var btnD = document.getElementById('btnDetails');
    var btnR = document.getElementById('btnReason');

    // Toggle between details and adoption reason
    var showDetails = function () {
      box.innerHTML =
        '<p><strong>Personality:</strong> ' + info.personality + '</p>' +
        '<p><strong>Health:</strong> ' + info.health + '</p>' +
        '<p><strong>Vaccination:</strong> ' + info.vaccinated + '</p>';
    };
    var showReason = function () {
      box.innerHTML =
        '<p><strong>Reason for Adoption:</strong> ' + info.reason + '</p>' +
        '<div class="callout inner">💛 ' + name + ' is looking for a loving home.</div>';
    };

    showDetails();
    btnD.addEventListener('click', showDetails);
    btnR.addEventListener('click', showReason);
  })();
});
