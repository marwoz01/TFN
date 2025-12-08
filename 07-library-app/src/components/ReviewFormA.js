"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import StarRating from "./StarRating";

const inputBase =
  "w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition";

const today = new Date();
today.setHours(0, 0, 0, 0);

// Yup schema
const reviewSchema = Yup.object({
  bookId: Yup.string().required("Wybierz książkę."),
  userName: Yup.string()
    .required("Imię recenzenta jest wymagane.")
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(50, "Imię może mieć maksymalnie 50 znaków."),
  rating: Yup.number()
    .typeError("Ocena jest wymagana.")
    .required("Ocena jest wymagana.")
    .min(1, "Minimalna ocena to 1.")
    .max(5, "Maksymalna ocena to 5."),
  reviewText: Yup.string()
    .required("Treść recenzji jest wymagana.")
    .min(10, "Recenzja musi mieć co najmniej 10 znaków.")
    .max(500, "Recenzja może mieć maksymalnie 500 znaków."),
  recommended: Yup.boolean(),
  dateRead: Yup.date()
    .max(today, "Data nie może być z przyszłości.")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});

export default function ReviewFormA({ books = [], onAddReview }) {
  const initialValues = useMemo(
    () => ({
      bookId: "",
      userName: "",
      rating: 0,
      reviewText: "",
      recommended: false,
      dateRead: "",
    }),
    [],
  );

  const formik = useFormik({
    initialValues,
    validationSchema: reviewSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, helpers) => {
      const { setSubmitting, resetForm } = helpers;

      const review = {
        id: Date.now().toString(),
        bookId: values.bookId,
        bookTitle:
          books.find((b) => String(b.id) === String(values.bookId))?.title ||
          "",
        userName: values.userName.trim(),
        rating: values.rating,
        reviewText: values.reviewText.trim(),
        recommended: values.recommended,
        dateRead: values.dateRead || null,
        date: new Date().toISOString(),
      };

      // symulacja wysyłania 1.5s
      setSubmitting(true);
      setTimeout(() => {
        onAddReview?.(review);
        resetForm();
        setSubmitting(false);
      }, 1500);
    },
  });

  const { values, errors, touched, isSubmitting, isValid } = formik;
  const charsLeft = 500 - (values.reviewText?.length || 0);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Dodaj recenzję książki
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Książka */}
        <div className="space-y-1">
          <label
            htmlFor="review-bookId"
            className="block text-sm text-neutral-200"
          >
            Książka
          </label>
          <select
            id="review-bookId"
            name="bookId"
            value={values.bookId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={errors.bookId && touched.bookId ? "true" : undefined}
            aria-describedby={
              errors.bookId && touched.bookId
                ? "review-bookId-error"
                : undefined
            }
            className={inputBase}
            disabled={isSubmitting}
          >
            <option value="">Wybierz książkę</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          {errors.bookId && touched.bookId && (
            <p id="review-bookId-error" className="text-sm text-red-500">
              {errors.bookId}
            </p>
          )}
        </div>

        {/* Imię recenzenta */}
        <div className="space-y-1">
          <label
            htmlFor="review-userName"
            className="block text-sm text-neutral-200"
          >
            Imię recenzenta
          </label>
          <input
            id="review-userName"
            name="userName"
            type="text"
            placeholder="Twoje imię"
            value={values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={
              errors.userName && touched.userName ? "true" : undefined
            }
            aria-describedby={
              errors.userName && touched.userName
                ? "review-userName-error"
                : undefined
            }
            className={inputBase}
            disabled={isSubmitting}
          />
          {errors.userName && touched.userName && (
            <p id="review-userName-error" className="text-sm text-red-500">
              {errors.userName}
            </p>
          )}
        </div>

        {/* Ocena (gwiazdki) */}
        <div className="space-y-1">
          <span className="block text-sm text-neutral-200">Ocena</span>
          <StarRating
            value={values.rating}
            onChange={(rating) => formik.setFieldValue("rating", rating, true)}
          />
          {errors.rating && touched.rating && (
            <p id="review-rating-error" className="text-sm text-red-500">
              {errors.rating}
            </p>
          )}
        </div>

        {/* Treść recenzji */}
        <div className="space-y-1">
          <label
            htmlFor="review-text"
            className="block text-sm text-neutral-200"
          >
            Treść recenzji
          </label>
          <textarea
            id="review-text"
            name="reviewText"
            rows={4}
            placeholder="Napisz, co sądzisz o książce..."
            value={values.reviewText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={
              errors.reviewText && touched.reviewText ? "true" : undefined
            }
            aria-describedby={
              errors.reviewText && touched.reviewText
                ? "review-text-error"
                : "review-text-counter"
            }
            className={inputBase}
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between text-xs">
            {errors.reviewText && touched.reviewText ? (
              <p id="review-text-error" className="text-red-500">
                {errors.reviewText}
              </p>
            ) : (
              <span id="review-text-counter" className="text-neutral-400">
                {values.reviewText.length}/500
              </span>
            )}
          </div>
        </div>

        {/* Polecam (checkbox) */}
        <div className="flex items-center gap-2">
          <input
            id="review-recommended"
            name="recommended"
            type="checkbox"
            checked={values.recommended}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-cyan-500"
            disabled={isSubmitting}
          />
          <label
            htmlFor="review-recommended"
            className="text-sm text-neutral-200"
          >
            Polecam tę książkę
          </label>
        </div>

        {/* Data przeczytania (opcjonalnie) */}
        <div className="space-y-1">
          <label
            htmlFor="review-dateRead"
            className="block text-sm text-neutral-200"
          >
            Data przeczytania (opcjonalnie)
          </label>
          <input
            id="review-dateRead"
            name="dateRead"
            type="date"
            max={today.toISOString().split("T")[0]}
            value={values.dateRead}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={
              errors.dateRead && touched.dateRead ? "true" : undefined
            }
            aria-describedby={
              errors.dateRead && touched.dateRead
                ? "review-dateRead-error"
                : undefined
            }
            className={inputBase}
            disabled={isSubmitting}
          />
          {errors.dateRead && touched.dateRead && (
            <p id="review-dateRead-error" className="text-sm text-red-500">
              {errors.dateRead}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full mt-2 rounded-xl bg-cyan-600 hover:bg-cyan-400 text-white font-semibold py-2.5 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Zapisuję recenzję..." : "Dodaj recenzję"}
        </button>
      </form>
    </div>
  );
}
