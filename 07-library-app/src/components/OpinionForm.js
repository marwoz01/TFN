"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const inputBase =
  "w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition";

const opinionSchema = Yup.object({
  bookId: Yup.string().required("Wybierz książkę."),
  readerName: Yup.string()
    .required("Imię czytelnika jest wymagane.")
    .min(2, "Imię musi mieć co najmniej 2 znaki."),
  wouldRecommend: Yup.string()
    .required("Wybierz odpowiedź.")
    .oneOf(["yes", "no", "maybe"], "Nieprawidłowa wartość."),
  strengths: Yup.string()
    .required("Mocne strony są wymagane.")
    .min(5, "Mocne strony muszą mieć co najmniej 5 znaków.")
    .max(300, "Mocne strony mogą mieć maksymalnie 300 znaków."),
  weaknesses: Yup.string()
    .max(300, "Słabe strony mogą mieć maksymalnie 300 znaków.")
    .nullable(),
  targetAudience: Yup.string()
    .required("Wybierz grupę docelową.")
    .oneOf(
      ["children", "teens", "adults", "all"],
      "Nieprawidłowa grupa docelowa.",
    ),
});

const initialValues = {
  bookId: "",
  readerName: "",
  wouldRecommend: "",
  strengths: "",
  weaknesses: "",
  targetAudience: "",
};

export default function OpinionForm({ books = [], onAddOpinion }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Opinia czytelnika
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={opinionSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const opinion = {
            id: Date.now().toString(),
            bookId: values.bookId,
            bookTitle:
              books.find((b) => String(b.id) === String(values.bookId))
                ?.title || "",
            readerName: values.readerName.trim(),
            wouldRecommend: values.wouldRecommend,
            strengths: values.strengths.trim(),
            weaknesses: values.weaknesses?.trim() || "",
            targetAudience: values.targetAudience,
            date: new Date().toISOString(),
          };

          setSubmitting(true);
          setTimeout(() => {
            onAddOpinion?.(opinion);
            resetForm();
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ errors, touched, isSubmitting, isValid, values }) => (
          <Form className="space-y-4">
            {/* Książka */}
            <div className="space-y-1">
              <label
                htmlFor="opinion-bookId"
                className="block text-sm text-neutral-200"
              >
                Książka
              </label>
              <Field
                as="select"
                id="opinion-bookId"
                name="bookId"
                className={inputBase}
                aria-invalid={
                  errors.bookId && touched.bookId ? "true" : undefined
                }
                aria-describedby={
                  errors.bookId && touched.bookId
                    ? "opinion-bookId-error"
                    : undefined
                }
                disabled={isSubmitting}
              >
                <option value="">Wybierz książkę</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="bookId"
                render={(msg) => (
                  <p id="opinion-bookId-error" className="text-sm text-red-500">
                    {msg}
                  </p>
                )}
              />
            </div>

            {/* Imię czytelnika */}
            <div className="space-y-1">
              <label
                htmlFor="opinion-readerName"
                className="block text-sm text-neutral-200"
              >
                Imię czytelnika
              </label>
              <Field
                id="opinion-readerName"
                name="readerName"
                type="text"
                placeholder="Twoje imię"
                className={inputBase}
                aria-invalid={
                  errors.readerName && touched.readerName ? "true" : undefined
                }
                aria-describedby={
                  errors.readerName && touched.readerName
                    ? "opinion-readerName-error"
                    : undefined
                }
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="readerName"
                render={(msg) => (
                  <p
                    id="opinion-readerName-error"
                    className="text-sm text-red-500"
                  >
                    {msg}
                  </p>
                )}
              />
            </div>

            {/* Czy polecasz? (radio group) */}
            <div className="space-y-1">
              <span className="block text-sm text-neutral-200">
                Czy polecasz?
              </span>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-200">
                <label className="inline-flex items-center gap-2">
                  <Field
                    type="radio"
                    name="wouldRecommend"
                    value="yes"
                    className="h-4 w-4 text-cyan-500"
                    disabled={isSubmitting}
                  />
                  Tak
                </label>
                <label className="inline-flex items-center gap-2">
                  <Field
                    type="radio"
                    name="wouldRecommend"
                    value="no"
                    className="h-4 w-4 text-cyan-500"
                    disabled={isSubmitting}
                  />
                  Nie
                </label>
                <label className="inline-flex items-center gap-2">
                  <Field
                    type="radio"
                    name="wouldRecommend"
                    value="maybe"
                    className="h-4 w-4 text-cyan-500"
                    disabled={isSubmitting}
                  />
                  Nie wiem
                </label>
              </div>
              {errors.wouldRecommend && touched.wouldRecommend && (
                <p
                  id="opinion-wouldRecommend-error"
                  className="text-sm text-red-500"
                >
                  {errors.wouldRecommend}
                </p>
              )}
            </div>

            {/* Mocne strony */}
            <div className="space-y-1">
              <label
                htmlFor="opinion-strengths"
                className="block text-sm text-neutral-200"
              >
                Mocne strony
              </label>
              <Field
                as="textarea"
                id="opinion-strengths"
                name="strengths"
                rows={3}
                placeholder="Co najbardziej Ci się podobało?"
                className={inputBase}
                aria-invalid={
                  errors.strengths && touched.strengths ? "true" : undefined
                }
                aria-describedby={
                  errors.strengths && touched.strengths
                    ? "opinion-strengths-error"
                    : undefined
                }
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="strengths"
                render={(msg) => (
                  <p
                    id="opinion-strengths-error"
                    className="text-sm text-red-500"
                  >
                    {msg}
                  </p>
                )}
              />
            </div>

            {/* Słabe strony (opcjonalne) */}
            <div className="space-y-1">
              <label
                htmlFor="opinion-weaknesses"
                className="block text-sm text-neutral-200"
              >
                Słabe strony (opcjonalnie)
              </label>
              <Field
                as="textarea"
                id="opinion-weaknesses"
                name="weaknesses"
                rows={3}
                placeholder="Co mogło być lepsze?"
                className={inputBase}
                aria-invalid={
                  errors.weaknesses && touched.weaknesses ? "true" : undefined
                }
                aria-describedby={
                  errors.weaknesses && touched.weaknesses
                    ? "opinion-weaknesses-error"
                    : undefined
                }
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="weaknesses"
                render={(msg) => (
                  <p
                    id="opinion-weaknesses-error"
                    className="text-sm text-red-500"
                  >
                    {msg}
                  </p>
                )}
              />
            </div>

            {/* Dla kogo książka */}
            <div className="space-y-1">
              <label
                htmlFor="opinion-targetAudience"
                className="block text-sm text-neutral-200"
              >
                Dla kogo książka?
              </label>
              <Field
                as="select"
                id="opinion-targetAudience"
                name="targetAudience"
                className={inputBase}
                aria-invalid={
                  errors.targetAudience && touched.targetAudience
                    ? "true"
                    : undefined
                }
                aria-describedby={
                  errors.targetAudience && touched.targetAudience
                    ? "opinion-targetAudience-error"
                    : undefined
                }
                disabled={isSubmitting}
              >
                <option value="">Wybierz grupę docelową</option>
                <option value="children">Dzieci</option>
                <option value="teens">Młodzież</option>
                <option value="adults">Dorośli</option>
                <option value="all">Wszyscy</option>
              </Field>
              <ErrorMessage
                name="targetAudience"
                render={(msg) => (
                  <p
                    id="opinion-targetAudience-error"
                    className="text-sm text-red-500"
                  >
                    {msg}
                  </p>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full mt-2 rounded-xl bg-cyan-600 hover:bg-cyan-400 text-white font-semibold py-2.5 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Zapisuję opinię..." : "Dodaj opinię"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
