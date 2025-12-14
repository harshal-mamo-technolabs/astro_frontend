import { Routes, Route } from "react-router-dom";
import { useProfile } from "./context/Profile";
import { useEffect } from "react";
import PlansPage from "./pages/PlansPage/PlansPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
 
import VerifyEmail from "./pages/VerifyEmail";
import {
  Home,
  Numerology,
  Solar_return,
  Synastry,
  Transits,
  Personality,
  LifepathNumber,
  Expression,
  ErrorPage,
  NatalChart,
  Numerologypage,
  Tarot,
  NatalChartcmp,
  Planets,
  Houses,
  Aspesets,
  NatalPersonality,
  NatalReport,
  SrChart,
  SrAspescts,
  SrHouses,
  SrPlanets,
  SrReport,
  Login,
  SynastryChart,
  SynastryReport,
  SynastryAspescts,
  SynastryPlanets,
  Profilelist,
  Profile,
  EditProfile,
  Contact,
  Privacy,
  Terms,
  Refund,
  MyAccount,
  SynastryPage,
  AntonioDetail,
  Subscriptionpolicy,
  PremiumPage,
  Term,
  Privacypolicy,
  Step1privacy,
  Partnersys,
  Partner,
  ZoiacSign,
  General,
  Happiness,
  Love,
  PaymentSuccess,
  Setting,
  Settings,
  ManageAccount,
  Help,
  Plans,
  PremiumPlanStatus,
} from "./index";
import PaymentTerms from "./pages/PaymentTerms";
import SubscriptionTerms from "./pages/SubscriptionTerms";
import MoneyBackPolicy from "./pages/MoneBack";
import CancelSubscription from "./pages/CancelSubscription";
import DailyTransit from "./components/Transit/DailyTransit";
import Forecast from "./components/Transit/Forecast";
import PredictionReport from "./components/Numerology_cmp/PredictionReport";
import Gift from "./components/More_detail/Gift";
import Senior from "./components/More_detail/Senior";
import Erotic from "./components/More_detail/Erotic";
import Fashion from "./components/More_detail/Fashion";
import Financial from "./components/More_detail/Financial";
import Health from "./components/More_detail/Health";
import Single from "./components/More_detail/Single";
import Career from "./components/More_detail/Career";
import Children from "./components/More_detail/Children";
import Soul from "./components/Numerology_cmp/Soul";
import Subcoincise from "./components/Numerology_cmp/Subcon";
import Support from "./pages/Support";
import Chat from "./pages/Chat";
import ForgotPassword from "./pages/ForgotPassword";
import ReferralPage from "./pages/ReferralPage";
import AuthPage from "./pages/Authmail";
import AuthIdPage from "./pages/Authpage";
import CheckoutForm from "./pages/CheckoutForm";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import CancelPlan from "./pages/CancelPlan";
import HelpUsImprove from "./pages/HelpUsImprove";
import ProtectedRoute from "./components/ProtectedRoute";
import SubscriptionPay from "./components/Subscription/Test.jsx";
import ProfilePay from "./components/Subscription/ProfilePayment";
import ChangePaymentDetails from "./components/ChangePaymentDetails";
import HouseReport from "./components/NatalChart_cmp/HouseReport";
import SynastryHousecusps from "./components/Synastry/SynastryHousecusps";
import SynastryConflicting from "./components/Synastry/SynastryConflicting";
import SynastryContrasting from "./components/Synastry/SynastryContrasting";
import SynastryIntense from "./components/Synastry/SynastryIntense";
import SynastryPhysical from "./components/Synastry/SynastryPhysical";
import SynastryEmotional from "./components/Synastry/SynastryEmotional";
import SynastrySexual from "./components/Synastry/SynastrySexual";
import SynastryFinancial from "./components/Synastry/SynastryFinancial";
import ProfileCancelPlan from "./pages/ProfileCancelPlan";
import NewProfilePage from "./pages/NewProfilePage";
import ProfilePlanStatus from "./pages/ProfilePlanStatus";
import ProfileDeletedPage from "./pages/ProfileDeletedPage";
import SecretDiscountPage from "./pages/SecretDiscountPage/SecretDiscountPage";
import PaymentDetailList from "./components/Billing/PaymentList";
import AddCardDetail from "./components/Billing/AddCardDetail";
import AstrologyReportPage from "./components/ChangePlan/AstrologyReportPage";
import PlanChangePage from "./pages/PlanChangePage/PlanChangePage";
import PlanChangeHandler from "./components/ChangePlan/PlanChangeHandler";
import SecretDiscountAppliedPage from "./pages/SecretDiscountAppliedPage/SecretDiscountAppliedPage";
import DeactivateAccountPage from "./pages/DeactivateAccountPage";
import DeactivationSuccessPage from "./pages/DeactivationSuccessPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import DeletionSuccessPage from "./pages/DeletionSuccessPage";
import Faq from "./pages/Faq";
import AboutZodiya from "./pages/AboutZodiya";
import ZodiyaFeatures from "./pages/ZodiyaFeatures";
import HowToUse from "./pages/HowToUse";
import SubscriptionAndBilling from "./pages/SubscriptionAndBilling";
import TechAssistance from "./pages/TechAssistance";

const SignupRedirect = () => {
  useEffect(() => {
    window.location.href = "https://astro-pathway-funnel-landing-page.vercel.app/";
  }, []);
  return null;
};

const App = () => {
  const { setFormData } = useProfile();


  useEffect(() => {
    const formdata = JSON.parse(localStorage.getItem("formData")) || {};
    setFormData(formdata);
  }, []);

  return (
    <div className="mx-auto scroll-smooth">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/return" element={<PaymentSuccessPage />} />
        <Route path="/verify-email/:code" element={<VerifyEmail />} />
        {/* <Route path="/" element={<Preloader />} /> */}
        {/* <Route path="/" element={<Preloader />} /> */}
        {/* Numerology routes start */}
        <Route
          path="/numerology/"
          element={<ProtectedRoute Compo={Numerology} />}
        >
          <Route path="numerology" exact element={<Numerologypage />} />
          <Route path="personality" element={<Personality />} />
          <Route path="lifepath" element={<LifepathNumber />} />
          <Route path="expression" element={<Expression />} />
          <Route path="report" element={<PredictionReport />} />
          <Route path="soul" element={<Soul />} />
          <Route path="subconscious" element={<Subcoincise />} />
        </Route>
        {/* Numerology routes end */}
        {/* Natal-Chart routes start */}
        <Route path="/natalchart" element={<ProtectedRoute Compo={NatalChart} />}>
          <Route path="natal-chart" element={<NatalChartcmp />} />
          <Route path="planets" element={<Planets />} />
          <Route path="houses" element={<Houses />} />
          <Route path="aspects" element={<Aspesets />} />
          <Route path="personality" element={<NatalPersonality />} />
          <Route path="report" element={<NatalReport />} />
          <Route path="planet-position" element={<Planets />} />
          <Route path="house-cups" element={<Houses />} />
          <Route path="sign-report" element={<NatalReport />} />
          <Route path="house-report" element={<HouseReport />} />
        </Route>
        {/* Natal-Chart routes end */}
        {/* Solar return routes start */}
        <Route path="/solar/" element={<ProtectedRoute Compo={Solar_return} />}>
          <Route path="chart" element={<SrChart />} />
          <Route path="planets" element={<SrPlanets />} />
          <Route path="houses" element={<SrHouses />} />
          <Route path="aspects" element={<SrAspescts />} />
          <Route path="report" element={<SrReport />} />
        </Route>
        {/* Solar return routes end */}
        <Route path="/tarot" element={<Tarot />} />
        {/* <Route path="/synastry/" element={<Synastry />}>
          <Route path="chart" element={<SynastryChart />} />
          <Route path="planets" element={<SynastryPlanets />} />
          <Route path="aspects" element={<SynastryAspescts />} />
          <Route path="report" element={<SynastryReport />} />
        </Route> */}
        {/* <Route
          path="/transits"
          element={<PrivateRoute Compo={Transits} formData={formData} />}
        /> */}{" "}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/home/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/subscriptionpolicy" element={<Subscriptionpolicy />} />
        <Route path="/Account" element={<MyAccount />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        <Route path="/policy" element={<Step1privacy />} />

        <Route path="/settings" element={<ProtectedRoute Compo={Settings} />} />
        <Route path="/settings/manageaccount" element={<ProtectedRoute Compo={ManageAccount} />} />
        <Route path="/settings/help" element={<ProtectedRoute Compo={Help} />} />
        <Route path="/settings/plans/cancelplan" element={<ProtectedRoute Compo={CancelPlan}/>} />
        <Route path="/settings/plans/profileplans/cancelprofileplans" element={<ProtectedRoute Compo={ProfileCancelPlan}/>}/>
        <Route path="/settings/plans/profileplans" element={<ProtectedRoute Compo={NewProfilePage}/>}/>
        <Route path="/settings/plans" element={<ProtectedRoute Compo={Plans} />} />
        <Route path="/settings/plans/premiumplanStatus" element={<ProtectedRoute Compo={PremiumPlanStatus} />} />
        <Route path="/settings/plans/profileplanStatus" element={<ProtectedRoute Compo={ProfilePlanStatus} />} />
        <Route path="/settings/plans/profiledeleted" element={<ProtectedRoute Compo={ProfileDeletedPage} />} />
        <Route path="/settings/plans/cancelprofilefeedback" element={<ProtectedRoute Compo={HelpUsImprove} />} />
        <Route path="/settings/plans/premiumplanStatus/changeplan" element={<ProtectedRoute Compo={PlanChangeHandler} />}/>
        <Route path="/settings/deactivateaccount" element={<DeactivateAccountPage />} />
        <Route path="/deactivation-success" element={<DeactivationSuccessPage />} />
        <Route path="/settings/deleteaccount" element={<DeleteAccountPage />} />
        <Route path="/deletion-success" element={<DeletionSuccessPage />} />
        <Route path="/faq" element={<ProtectedRoute Compo={Faq} />} />
        <Route path="/about-zodiya" element={<ProtectedRoute Compo={AboutZodiya} />} />
        <Route path="/zodiya-features" element={<ProtectedRoute Compo={ZodiyaFeatures} />} />
        <Route path="/how-to-use" element={<ProtectedRoute Compo={HowToUse} />} />
        <Route path="/subscription-and-billing" element={<ProtectedRoute Compo={SubscriptionAndBilling} />} />
        <Route path="/tech-assistance" element={<ProtectedRoute Compo={TechAssistance} />} />

        <Route path="/done" element={<ProtectedRoute Compo={AstrologyReportPage} />} />
        <Route
          path="/subscription"
          element={<ProtectedRoute Compo={PlansPage} />}
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/verify" element={<AuthPage />} />
        <Route path="/reset-password/:id" element={<AuthIdPage />} />
        <Route path="/checkout/:id" element={<CheckoutForm />} />{" "}
        <Route path="/success" element={<PaymentSuccessPage />} />

        <Route
          path="/secretdiscountedPayment"
          element={
              <SecretDiscountPage />
          }
        />
        

        <Route
          path="/secretDiscountApplied"
          element={<SecretDiscountAppliedPage />}
        />

        {/* <Route
          path="/synastrypage"
          element={<PrivateRoute Compo={SynastryPage} formData={formData} />}
        /> */}
        <Route
          path="/synastrypage"
          element={<ProtectedRoute Compo={SynastryPage} />}
        />
        <Route path="/synastrypage/partner" element={<Partnersys />} />
        <Route path="/synastrypage/partner/:id" element={<Synastry />}>
          <Route path="chart" element={<SynastryChart />} />
          <Route path="planets" element={<SynastryPlanets />} />
          <Route path="aspects" element={<SynastryAspescts />} />
          <Route path="housecusps" element={<SynastryHousecusps />} />
          <Route path="conflicting" element={<SynastryConflicting />} />
          <Route path="contrasting" element={<SynastryContrasting />} />
          <Route path="intense" element={<SynastryIntense />} />
          <Route path="physical" element={<SynastryPhysical />} />
          <Route path="emotional" element={<SynastryEmotional />} />
          <Route path="report" element={<SynastryReport />} />
          <Route path="sexual" element={<SynastrySexual />} />
          <Route path="financial" element={<SynastryFinancial />} />
        </Route>
        {/* test routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home/profilelist" element={<Profilelist />} />
        <Route path="/home/support" element={<Support />} />
        <Route path="/home/chat/:name/:id" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="home/detail" element={<AntonioDetail />} />
        <Route path="/term" element={<Term />} />
        {/* <Route path="/subscription" element={<Subscription />} /> */}
        <Route path="home/premium" element={<PremiumPage />} />
        {/* <Route path="/dashboard" element={<QuestionAdd />} /> */}
        {/* zoiac sgn route */}
        <Route
          path="/home/detail/"
          element={<ProtectedRoute Compo={ZoiacSign} />}
        >
          <Route path="setting" element={<Setting />} />
          <Route path="annual" element={<General />} />
          <Route path="happiness" element={<Happiness />} />
          <Route path="career" element={<Career />} />
          <Route path="children" element={<Children />} />
          <Route path="partner" element={<Partner />} />
          <Route path="love" element={<Love />} />
          <Route path="gift" element={<Gift />} />
          <Route path="senior" element={<Senior />} />
          <Route path="erotic" element={<Erotic />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="Financial" element={<Financial />} />
          <Route path="Health" element={<Health />} />
          <Route path="single" element={<Single />} />
        </Route>
        {/* transist route */}
        <Route path="/transits/" element={<ProtectedRoute Compo={Transits} />}>
          <Route path="dailytransit" element={<DailyTransit />} />
          <Route path="forecast" element={<Forecast />} />
        </Route>
        {/* Terms of uses routes */}
        <Route path="/home/Paymentterms" element={<PaymentTerms />} />
        <Route path="/home/membershipterms" element={<SubscriptionTerms />} />
        <Route path="/home/moneybackpolicy" element={<MoneyBackPolicy />} />
        <Route
          path="/home/cancelsubscription"
          element={<CancelSubscription />}
        />
        <Route path="/subscription/payment" element={<PaymentSuccess />} />
        <Route
          path="/subscription/changePayment"
          element={<ChangePaymentDetails />}
        />
        <Route
          path="/settings/billing"
          element={<PaymentDetailList />}
        />
        <Route path="/billing/addCard" element={<AddCardDetail/>}/>
        <Route path="/subscription/pay" element={<SubscriptionPay />} />
        <Route path="/subscription/profile/pay" element={<ProfilePay />} />
        <Route path="/signup" element={<SignupRedirect />} />
        <Route path="/" element={<SignupRedirect />} />
        <Route path="/refer" element={<ReferralPage />} />
        <Route
          path="/plan-change"
          element={<ProtectedRoute Compo={PlanChangePage} />}
        />
      </Routes>
    </div>
  );
};

export default App;
