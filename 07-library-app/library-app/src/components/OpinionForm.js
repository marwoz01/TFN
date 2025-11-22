"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const opinionSchema = Yup.object({
  bookId: Yup.string().required("Wybierz książkę."),
  readerName: Yup.string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .required("Imię czytelnika jest wymagane."),
  wouldRecommend: Yup.mixed()
    .oneOf(["yes", "no", "maybe"], "Wybierz jedną z opcji.")
    .required("Odpowiedź jest wymagana."),
  strengths: Yup.string()
    .min(5, "Mocne strony muszą mieć co najmniej 5 znaków.")
    .max(300, "Mocne strony mogą mieć maksymalnie 300 znaków.")
    .required("Mocne strony są wymagane."),
  weaknesses: Yup.string()
    .max(300, "Słabe strony mogą mieć maksymalnie 300 znaków.")
    .notRequired(),
  targetAudience: Yup.mixed()
    .oneOf(["children", "teens", "adults", "all"], "Wybierz grupę odbiorców.")
    .required("Określenie grupy odbiorców jest wymagane."),
});

export default function OpinionForm({ books, onAddOpinion }) {
  const initialValues = {
    bookId: "",
    readerName: "",
    wouldRecommend: "",
    strengths: "",
    weaknesses: "",
    targetAudience: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={opinionSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
          const book = books.find(
            (b) => String(b.id) === String(values.bookId)
          );

          const opinion = {
            id: Date.now(),
            bookId: values.bookId,
            bookTitle: book ? book.title : "Nieznana książka",
            readerName: values.readerName,
            wouldRecommend: values.wouldRecommend,
            strengths: values.strengths,
            weaknesses: values.weaknesses || "",
            targetAudience: values.targetAudience,
            date: new Date().toISOString(),
          };

          onAddOpinion(opinion);
          resetForm();
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form className="flex flex-col gap-3 p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200 mt-6">
          <h2 className="text-lg font-semibold text-center text-neutral-100 mb-3 tracking-wide">
            Opinia czytelnika
          </h2>

          {/* KSIĄŻKA */}
          <div>
            <label
              htmlFor="opinion-bookId"
              className="text-sm text-neutral-300"
            >
              Książka <span className="text-red-400">*</span>
            </label>
            <Field
              as="select"
              id="opinion-bookId"
              name="bookId"
              className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100
                focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
                ${
                  touched.bookId && errors.bookId
                    ? "border-red-700"
                    : "border-neutral-700"
                }`}
              aria-invalid={
                touched.bookId && errors.bookId ? "true" : undefined
              }
              aria-describedby={
                touched.bookId && errors.bookId
                  ? "opinion-bookId-error"
                  : undefined
              }
            >
              <option value="">-- wybierz książkę --</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </Field>
            <ErrorMessage name="bookId">
              {(msg) => (
                <p
                  id="opinion-bookId-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          {/* IMIĘ CZYTELNIKA */}
          <div>
            <label
              htmlFor="opinion-readerName"
              className="text-sm text-neutral-300"
            >
              Imię czytelnika <span className="text-red-400">*</span>
            </label>
            <Field
              id="opinion-readerName"
              name="readerName"
              type="text"
              autoComplete="off"
              className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
                focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
                ${
                  touched.readerName && errors.readerName
                    ? "border-red-700"
                    : "border-neutral-700"
                }`}
              aria-invalid={
                touched.readerName && errors.readerName ? "true" : undefined
              }
              aria-describedby={
                touched.readerName && errors.readerName
                  ? "opinion-readerName-error"
                  : undefined
              }
            />
            <ErrorMessage name="readerName">
              {(msg) => (
                <p
                  id="opinion-readerName-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          {/* CZY POLECASZ? RADIO GROUP */}
          <div>
            <span
              id="opinion-wouldRecommend-label"
              className="text-sm text-neutral-300"
            >
              Czy polecasz? <span className="text-red-400">*</span>
            </span>
            <div
              role="radiogroup"
              aria-labelledby="opinion-wouldRecommend-label"
              className="mt-1 flex flex-wrap gap-4"
            >
              <label className="inline-flex items-center gap-2 text-sm text-neutral-200">
                <Field
                  type="radio"
                  name="wouldRecommend"
                  value="yes"
                  className="accent-rose-500"
                />
                Tak
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-neutral-200">
                <Field
                  type="radio"
                  name="wouldRecommend"
                  value="no"
                  className="accent-rose-500"
                />
                Nie
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-neutral-200">
                <Field
                  type="radio"
                  name="wouldRecommend"
                  value="maybe"
                  className="accent-rose-500"
                />
                Nie wiem
              </label>
            </div>
            <ErrorMessage name="wouldRecommend">
              {(msg) => <p className="text-red-400 text-sm mt-1">{msg}</p>}
            </ErrorMessage>
          </div>

          {/* MOCNE STRONY */}
          <div>
            <label
              htmlFor="opinion-strengths"
              className="text-sm text-neutral-300"
            >
              Mocne strony <span className="text-red-400">*</span>
            </label>
            <Field
              as="textarea"
              id="opinion-strengths"
              name="strengths"
              className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 h-24
                focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
                ${
                  touched.strengths && errors.strengths
                    ? "border-red-700"
                    : "border-neutral-700"
                }`}
              aria-invalid={
                touched.strengths && errors.strengths ? "true" : undefined
              }
              aria-describedby={
                touched.strengths && errors.strengths
                  ? "opinion-strengths-error"
                  : undefined
              }
            />
            <ErrorMessage name="strengths">
              {(msg) => (
                <p
                  id="opinion-strengths-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          {/* SŁABE STRONY */}
          <div>
            <label
              htmlFor="opinion-weaknesses"
              className="text-sm text-neutral-300"
            >
              Słabe strony{" "}
              <span className="text-neutral-400 text-xs">(opcjonalnie)</span>
            </label>
            <Field
              as="textarea"
              id="opinion-weaknesses"
              name="weaknesses"
              className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 h-24
                focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
                ${
                  touched.weaknesses && errors.weaknesses
                    ? "border-red-700"
                    : "border-neutral-700"
                }`}
              aria-invalid={
                touched.weaknesses && errors.weaknesses ? "true" : undefined
              }
              aria-describedby={
                touched.weaknesses && errors.weaknesses
                  ? "opinion-weaknesses-error"
                  : undefined
              }
            />
            <ErrorMessage name="weaknesses">
              {(msg) => (
                <p
                  id="opinion-weaknesses-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          {/* DLA KOGO KSIĄŻKA */}
          <div>
            <label
              htmlFor="opinion-targetAudience"
              className="text-sm text-neutral-300"
            >
              Dla kogo książka? <span className="text-red-400">*</span>
            </label>
            <Field
              as="select"
              id="opinion-targetAudience"
              name="targetAudience"
              className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100
                focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
                ${
                  touched.targetAudience && errors.targetAudience
                    ? "border-red-700"
                    : "border-neutral-700"
                }`}
              aria-invalid={
                touched.targetAudience && errors.targetAudience
                  ? "true"
                  : undefined
              }
              aria-describedby={
                touched.targetAudience && errors.targetAudience
                  ? "opinion-targetAudience-error"
                  : undefined
              }
            >
              <option value="">-- wybierz grupę odbiorców --</option>
              <option value="children">Dzieci</option>
              <option value="teens">Młodzież</option>
              <option value="adults">Dorośli</option>
              <option value="all">Wszyscy</option>
            </Field>
            <ErrorMessage name="targetAudience">
              {(msg) => (
                <p
                  id="opinion-targetAudience-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg
              border border-rose-500/30 shadow-md shadow-rose-900/20 transition
              ${(!isValid || isSubmitting) && "opacity-60 cursor-not-allowed"}`}
          >
            {isSubmitting ? "Zapisywanie..." : "Dodaj opinię"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
