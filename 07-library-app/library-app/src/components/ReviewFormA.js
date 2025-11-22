"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import StarRating from "./StarRating";

const reviewSchema = Yup.object({
  bookId: Yup.string().required("Wybierz książkę."),
  userName: Yup.string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(50, "Imię może mieć maksymalnie 50 znaków.")
    .required("Imię jest wymagane."),
  rating: Yup.number()
    .required("Ocena jest wymagana.")
    .min(1, "Minimalna ocena to 1.")
    .max(5, "Maksymalna ocena to 5."),
  reviewText: Yup.string()
    .min(10, "Recenzja musi mieć co najmniej 10 znaków.")
    .max(500, "Recenzja może mieć maksymalnie 500 znaków.")
    .required("Treść recenzji jest wymagana."),
  recommended: Yup.boolean(),
  dateRead: Yup.date()
    .max(new Date(), "Data nie może być z przyszłości.")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});

export default function ReviewFormA({ books, onAddReview }) {
  const formik = useFormik({
    initialValues: {
      bookId: "",
      userName: "",
      rating: "",
      reviewText: "",
      recommended: false,
      dateRead: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      setTimeout(() => {
        const book = books.find((b) => String(b.id) === String(values.bookId));

        const newReview = {
          id: Date.now(),
          bookId: values.bookId,
          bookTitle: book ? book.title : "Nieznana książka",
          userName: values.userName,
          rating: Number(values.rating),
          reviewText: values.reviewText,
          recommended: values.recommended,
          dateRead: values.dateRead || null,
          date: new Date().toISOString(),
        };

        onAddReview(newReview);
        resetForm();
        setSubmitting(false);
      }, 1500);
    },
  });

  const charCount = formik.values.reviewText.length;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200 mt-4"
    >
      <h2 className="text-lg font-semibold text-center text-neutral-100 mb-3 tracking-wide">
        Dodaj recenzję
      </h2>

      {/* KSIĄŻKA */}
      <label className="text-sm text-neutral-300">
        Książka
        <select
          name="bookId"
          value={formik.values.bookId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100
          focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
          ${
            formik.touched.bookId && formik.errors.bookId
              ? "border-red-700"
              : "border-neutral-700"
          }`}
        >
          <option value="">-- wybierz książkę --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </label>
      {formik.touched.bookId && formik.errors.bookId && (
        <p className="text-red-400 text-sm">{formik.errors.bookId}</p>
      )}

      {/* IMIĘ RECENZENTA */}
      <input
        name="userName"
        type="text"
        placeholder="Imię recenzenta"
        autoComplete="off"
        value={formik.values.userName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${
          formik.touched.userName && formik.errors.userName
            ? "border-red-700"
            : "border-neutral-700"
        }`}
      />
      {formik.touched.userName && formik.errors.userName && (
        <p className="text-red-400 text-sm">{formik.errors.userName}</p>
      )}

      {/* OCENA (na razie select 1–5, gwiazdki dodamy później) */}
      <div className="flex flex-col gap-1">
        <span className="text-sm text-neutral-300">Ocena</span>

        <StarRating
          value={formik.values.rating || 0}
          onChange={(val) => formik.setFieldValue("rating", val)}
        />

        {formik.touched.rating && formik.errors.rating && (
          <p className="text-red-400 text-sm">{formik.errors.rating}</p>
        )}
      </div>

      {formik.touched.rating && formik.errors.rating && (
        <p className="text-red-400 text-sm">{formik.errors.rating}</p>
      )}

      {/* TREŚĆ RECENZJI + LICZNIK */}
      <div>
        <textarea
          name="reviewText"
          placeholder="Treść recenzji"
          value={formik.values.reviewText}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 h-28
          focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
          ${
            formik.touched.reviewText && formik.errors.reviewText
              ? "border-red-700"
              : "border-neutral-700"
          }`}
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>
            {formik.touched.reviewText && formik.errors.reviewText && (
              <span className="text-red-400">{formik.errors.reviewText}</span>
            )}
          </span>
          <span>{charCount}/500</span>
        </div>
      </div>

      {/* POLECAM */}
      <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
        <input
          type="checkbox"
          name="recommended"
          checked={formik.values.recommended}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="rounded bg-neutral-800 border-neutral-700"
        />
        Polecam tę książkę
      </label>

      {/* DATA PRZECZYTANIA */}
      <div>
        <label className="text-sm text-neutral-300">
          Data przeczytania (opcjonalnie)
          <input
            type="date"
            name="dateRead"
            value={formik.values.dateRead || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100
            focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
            ${
              formik.touched.dateRead && formik.errors.dateRead
                ? "border-red-700"
                : "border-neutral-700"
            }`}
          />
        </label>
        {formik.touched.dateRead && formik.errors.dateRead && (
          <p className="text-red-400 text-sm">{formik.errors.dateRead}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting}
        className={`bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg
        border border-rose-500/30 shadow-md shadow-rose-900/20 transition
        ${
          (!formik.isValid || formik.isSubmitting) &&
          "opacity-60 cursor-not-allowed"
        }`}
      >
        {formik.isSubmitting ? "Zapisywanie..." : "Dodaj recenzję"}
      </button>
    </form>
  );
}
