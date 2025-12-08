"use server";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateReservation(formData) {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookId = formData.get("bookId");
  const bookTitle = formData.get("bookTitle");
  const userName = (formData.get("userName") || "").trim();
  const userEmail = (formData.get("userEmail") || "").trim();
  const reservationDateStr = formData.get("reservationDate");
  const durationStr = formData.get("duration");
  const notes = (formData.get("notes") || "").trim();

  if (!bookId) {
    errors.bookId = "Wybierz książkę.";
  }

  if (!userName) {
    errors.userName = "Imię i nazwisko jest wymagane.";
  } else if (userName.length < 3) {
    errors.userName = "Imię i nazwisko musi mieć co najmniej 3 znaki.";
  }

  if (!userEmail) {
    errors.userEmail = "Adres e-mail jest wymagany.";
  } else if (!isValidEmail(userEmail)) {
    errors.userEmail = "Podaj poprawny adres e-mail.";
  }

  if (!reservationDateStr) {
    errors.reservationDate = "Data rezerwacji jest wymagana.";
  } else {
    const reservationDate = new Date(reservationDateStr);
    reservationDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(reservationDate.getTime())) {
      errors.reservationDate = "Podaj poprawną datę.";
    } else if (reservationDate < today) {
      errors.reservationDate =
        "Data rezerwacji nie może być wcześniejsza niż dzisiaj.";
    }
  }

  const duration = Number(durationStr);
  if (!durationStr) {
    errors.duration = "Podaj czas rezerwacji w dniach.";
  } else if (!Number.isFinite(duration)) {
    errors.duration = "Czas rezerwacji musi być liczbą.";
  } else if (duration < 1 || duration > 30) {
    errors.duration = "Czas rezerwacji musi być w zakresie 1–30 dni.";
  }

  if (notes && notes.length > 200) {
    errors.notes = "Uwagi mogą mieć maksymalnie 200 znaków.";
  }

  const hasErrors = Object.keys(errors).length > 0;

  return {
    hasErrors,
    errors,
    values: {
      bookId,
      bookTitle,
      userName,
      userEmail,
      reservationDate: reservationDateStr,
      duration: duration || null,
      notes,
    },
  };
}

export async function createReservationAction(prevState, formData) {
  const initialState = {
    success: false,
    errors: {},
    serverError: null,
    reservation: null,
  };

  const { hasErrors, errors, values } = validateReservation(formData);

  if (hasErrors) {
    return {
      ...initialState,
      errors,
    };
  }

  await sleep(2000);

  const random = Math.random();
  if (random < 0.2) {
    return {
      ...initialState,
      serverError: "Wystąpił losowy błąd serwera. Spróbuj ponownie za chwilę.",
    };
  }

  const reservation = {
    id: Date.now().toString(),
    bookId: values.bookId,
    bookTitle: values.bookTitle || "",
    userName: values.userName,
    userEmail: values.userEmail,
    reservationDate: values.reservationDate,
    duration: values.duration,
    notes: values.notes,
    status: "confirmed",
  };

  return {
    success: true,
    errors: {},
    serverError: null,
    reservation,
  };
}
