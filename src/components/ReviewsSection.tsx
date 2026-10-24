import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, AlertCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonialsData';
import { Testimonial } from '../types';
import { COURSES } from '../data/coursesData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newCourseName, setNewCourseName] = useState<string>(COURSES[0].name);
  const [newRating, setNewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [submissionFeedback, setSubmissionFeedback] = useState<string>('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newReviewText.trim()) return;

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      studentName: newStudentName.trim(),
      courseName: newCourseName,
      rating: newRating,
      reviewText: newReviewText.trim(),
      year: '2026 Batch',
      location: 'Kolkata',
      isDemo: true
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmissionFeedback('Review submitted successfully! It has been added to the demo feed.');
    setNewStudentName('');
    setNewReviewText('');

    setTimeout(() => {
      setShowReviewModal(false);
      setSubmissionFeedback('');
    }, 1800);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#145da0] mb-2">
              <Star className="w-3.5 h-3.5 text-[#c99b2e] fill-[#c99b2e]" />
              <span>CANDIDATE FEEDBACK & EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#0a2240] tracking-tight">
              Student Experiences
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Clearly labeled demo testimonials
            </span>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2 text-xs font-bold text-[#0a2240] bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#c99b2e]" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-[#c99b2e]/15 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* Gold Stars */}
                <div className="flex items-center gap-1 text-[#c99b2e] mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < item.rating ? '★' : '☆'}
                    </span>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">
                    {item.rating}.0
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-5">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Student Meta */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a2240] to-[#145da0] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {item.studentName.charAt(0)}
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0a2240] block">
                      {item.studentName}
                    </strong>
                    <span className="text-[10px] text-[#145da0] font-medium block">
                      {item.courseName}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium border border-amber-200 block">
                    Sample Review
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Reviews shown are representative sample records during development. Genuine candidate submissions can be reviewed through the moderation panel.</span>
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="text-lg font-bold font-serif-title text-[#0a2240]">
                Write a Student Experience Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submissionFeedback ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{submissionFeedback}</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="e.g. Sweta Banik"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Course Completed *</label>
                  <select
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Star Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`text-2xl cursor-pointer transition-transform ${
                          star <= newRating ? 'text-[#c99b2e] scale-110' : 'text-slate-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-600 ml-2">{newRating} of 5 Stars</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Written Review / Feedback *</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience regarding the training, instructors, and practical workshop..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#145da0]"
                  />
                </div>

                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-900 leading-tight">
                  Note: Publicly submitted reviews undergo institutional verification before becoming verified testimonials. For development, submissions appear directly in the demo feed.
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#0a2240] hover:bg-[#145da0] rounded-lg shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
