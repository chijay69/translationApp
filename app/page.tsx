import { cookies } from 'next/headers';
import Link from "next/link";
import {
  FlagBrazil,
  FlagCanada,
  FlagGermany,
  FlagSpain,
  FlagGreece,
  FlagUK,
  FlagMexico,
  FlagIndonesia,
} from "./components/flags";

export default async function Home() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');
  const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 pb-20">
        <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            {/* Grid of flags */}
            <div className="grid grid-cols-4 gap-3 w-full mb-8">
              <FlagBrazil className="w-full h-auto" />
              <FlagCanada className="w-full h-auto" />
              <FlagGermany className="w-full h-auto" />
              <FlagSpain className="w-full h-auto" />
              <FlagGreece className="w-full h-auto" />
              <FlagUK className="w-full h-auto" />
              <FlagMexico className="w-full h-auto" />
              <FlagIndonesia className="w-full h-auto" />
              <div className="rounded-full bg-green-600 aspect-square flex items-center justify-center">
                <div className="text-white text-xs">+93</div>
              </div>
            </div>

            {/* App name */}
            <div className="text-indigo-700 text-sm font-semibold tracking-wider mb-2">TRANSLAPP</div>

            {/* Main heading */}
            <h1 className="text-2xl font-bold text-center mb-2">Welcome to TranslApp</h1>

            {/* Subtext */}
            <p className="text-gray-500 text-sm text-center mb-8">
              Sign in to start translating in over 100 languages
            </p>

            {/* Buttons */}
            <div className="space-y-4 w-full">
              <Link
                href="/auth/signin"
                className="block w-full bg-indigo-600 text-white py-3 rounded-full text-center font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full bg-white text-indigo-600 py-3 rounded-full text-center font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 pb-20">
      <div className="bg-white rounded-3xl shadow-lg max-w-sm w-full overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          {/* Grid of flags */}
          <div className="grid grid-cols-4 gap-3 w-full mb-8">
            <FlagBrazil className="w-full h-auto" />
            <FlagCanada className="w-full h-auto" />
            <FlagGermany className="w-full h-auto" />
            <FlagSpain className="w-full h-auto" />
            <FlagGreece className="w-full h-auto" />
            <FlagUK className="w-full h-auto" />
            <FlagMexico className="w-full h-auto" />
            <FlagIndonesia className="w-full h-auto" />
            <div className="rounded-full bg-green-600 aspect-square flex items-center justify-center">
              <div className="text-white text-xs">+93</div>
            </div>
          </div>

          {/* App name */}
          <div className="text-indigo-700 text-sm font-semibold tracking-wider mb-2">TRANSLAPP</div>

          {/* Main heading */}
          <h1 className="text-2xl font-bold text-center mb-2">Translate Over 100 Languages</h1>

          {/* Subtext */}
          <p className="text-gray-500 text-sm text-center mb-8">
            More than 100 Languages ready to translate on this app
          </p>

          {/* Pagination dots */}
          <div className="flex gap-1 mb-8">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          {/* Continue button */}
          <Link
            href="/voice"
            className="w-full bg-indigo-600 text-white py-3 rounded-full text-center font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

