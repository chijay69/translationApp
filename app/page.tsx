import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
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
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
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

