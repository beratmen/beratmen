import React, { useState } from 'react';
import { FaGem, FaCrown, FaMedal, FaGithub, FaLock, FaPaypal, FaCreditCard, FaTimes } from 'react-icons/fa';

interface DonationOption {
  amount: number;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

type PaymentMethod = 'stripe' | 'paypal';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onSelectPayment: (method: PaymentMethod) => void;
}

const PaymentMethodModal: React.FC<PaymentModalProps> = ({ amount, onClose, onSelectPayment }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-md w-full border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Choose Payment Method
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ${amount}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select your preferred payment method
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onSelectPayment('stripe')}
            className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                     hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 
                     transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <FaCreditCard className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Pay with Card</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Powered by Stripe</div>
              </div>
            </div>
            <FaLock className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => onSelectPayment('paypal')}
            className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 
                     hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 
                     transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <FaPaypal className="w-6 h-6 text-[#00457C]" />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">Pay with PayPal</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Fast and secure</div>
              </div>
            </div>
            <FaLock className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Donate: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const donationOptions: DonationOption[] = [
    {
      amount: 25,
      icon: FaMedal,
      label: 'Bronze Supporter',
      description: 'Help maintain the projects'
    },
    {
      amount: 50,
      icon: FaGem,
      label: 'Diamond Supporter',
      description: 'Support new features and improvements'
    },
    {
      amount: 100,
      icon: FaCrown,
      label: 'Crown Supporter',
      description: 'Become a major contributor'
    },
  ];

  const handleDonate = (amount: number) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    if (method === 'stripe') {
      window.open(`https://buy.stripe.com/YOUR_PAYMENT_LINK/${selectedAmount}`, '_blank');
    } else {
      window.open(`https://www.paypal.com/paypalme/YOUR_PAYPAL_USERNAME/${selectedAmount}`, '_blank');
    }
    setShowPaymentModal(false);
  };

  const handleCustomDonate = () => {
    setSelectedAmount(null);
    setShowPaymentModal(true);
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Support My Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your support helps me continue creating and maintaining open-source projects.
            Choose an amount that feels right for you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {donationOptions.map(({ amount, icon: Icon, label, description }) => (
                <button
                  key={amount}
                  onClick={() => handleDonate(amount)}
                  className="group relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                           hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 
                           dark:hover:bg-blue-900/10 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      <Icon className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white mb-1">
                        ${amount}
                      </div>
                      <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                        {label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4">
              <button
                onClick={handleCustomDonate}
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 
                         hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors
                         px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10"
              >
                <span>Custom Amount</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <FaLock className="w-4 h-4" />
                <span>All payments are secure and encrypted</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Other ways to support
            </div>
            <a
              href="https://github.com/sponsors/YOUR_GITHUB_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-700 dark:text-gray-300 
                       hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors
                       px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaGithub className="w-5 h-5" />
              <span>Become a GitHub Sponsor</span>
            </a>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentMethodModal
          amount={selectedAmount || 0}
          onClose={() => setShowPaymentModal(false)}
          onSelectPayment={handlePaymentMethodSelect}
        />
      )}
    </section>
  );
};

export default Donate; 