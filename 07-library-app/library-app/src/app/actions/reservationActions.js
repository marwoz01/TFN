"use server";

export async function createReservation(prevState, formData) {
  const errors = {};

  const bookId = formData.get("bookId");
  const bookTitle = formData.get("bookTitle");
  const userName = (formData.get("userName") || "").toString().trim();
  const userEmail = (formData.get("userEmail") || "").toString().trim();
  const reservationDate = formData.get("reservationDate");
  const durationValue = formData.get("duration");
  const notes = (formData.get("notes") || "").toString();

  if (!bookId) {
    errors.bookId = "Wybierz książkę.";
  }

  if (!userName || userName.length < 3) {
    errors.userName = "Imię i nazwisko musi mieć co najmniej 3 znaki.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userEmail) {
    errors.userEmail = "Email jest wymagany.";
  } else if (!emailRegex.test(userEmail)) {
    errors.userEmail = "Podaj poprawny adres email.";
  }

  if (!reservationDate) {
    errors.reservationDate = "Data rezerwacji jest wymagana.";
  } else {
    const selectedDate = new Date(reservationDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      errors.reservationDate = "Podaj poprawną datę.";
    } else if (selectedDate < today) {
      errors.reservationDate =
        "Data rezerwacji nie może być wcześniejsza niż dzisiaj.";
    }
  }

  const duration = Number(durationValue);
  if (!durationValue) {
    errors.duration = "Podaj czas rezerwacji (1–30 dni).";
  } else if (!Number.isFinite(duration) || duration < 1 || duration > 30) {
    errors.duration = "Czas rezerwacji musi być liczbą w zakresie 1–30.";
  }

  if (notes.length > 200) {
    errors.notes = "Uwagi mogą mieć maksymalnie 200 znaków.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      serverError: null,
      reservation: null,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const isFailure = Math.random() < 0.2;
  if (isFailure) {
    return {
      success: false,
      errors: {},
      serverError: "Wystąpił losowy błąd serwera. Spróbuj ponownie.",
      reservation: null,
    };
  }

  const reservation = {
    id: Date.now(),
    bookId,
    bookTitle,
    userName,
    userEmail,
    reservationDate,
    duration,
    notes,
    status: "confirmed",
  };

  return {
    success: true,
    errors: {},
    serverError: null,
    reservation,
  };
}
