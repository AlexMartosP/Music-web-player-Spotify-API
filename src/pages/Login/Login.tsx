import { AlertCircle, AlertTriangle } from "react-feather";
import {
  generateAuthUrl,
  generateCodeChallenge,
  generateRandomString,
} from "../../utils/auth_code";
import blobs1 from "../../assets/blobs_1.jpg";
import {
  BlobWrapper,
  ButtonWrapper,
  Left,
  MessageWrapper,
  Wrapper,
} from "./Login.styles";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { selectAuth, selectLoading } from "../../slices/auth";
import { useAppSelector } from "../../store/hooks";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [searchParams] = useSearchParams();
  const { loggingIn, error } = useAppSelector(selectAuth);
  const { login } = useAuth();

  async function redirect() {
    const codeVerifier = generateRandomString(112);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const generated = generateAuthUrl(codeChallenge);

    sessionStorage.setItem("code_verifier", codeVerifier);
    sessionStorage.setItem("state", generated.state);

    window.open(generated.url, "_self");
  }

  useEffect(() => {
    const responseCode = searchParams.get("code");
    const responseState = searchParams.get("state");
    const responseError = searchParams.get("error");
    const prevState = sessionStorage.getItem("state");

    if (!responseError) {
      if (responseCode && responseState === prevState) {
        const code_verifier = sessionStorage.getItem("code_verifier")!;

        login(responseCode, code_verifier);
      }
    }
  }, []);

  return (
    <Wrapper>
      <Left>
        <MessageWrapper>
          <AlertCircle color="var(--clr-red)" />
          <div>
            <div>
              This site can currently only be used by listed users, due to API
              limit (for now).
            </div>
            <span className="text-red">
              Please contact me at{" "}
              <a href="mailto:alex.martos@hotmail.se">alex.martos@hotmail.se</a>
            </span>
          </div>
        </MessageWrapper>
        <MessageWrapper>
          <AlertTriangle color="var(--clr-yellow)" />
          <span>Actions on this site will affect your Spotify account</span>
        </MessageWrapper>
        <ButtonWrapper>
          <span>To use this site a premium Spotify account is required</span>
          <button onClick={redirect} disabled={loggingIn}>
            {!loggingIn ? "Log in with Spotify" : "Logging in"}
          </button>
          {error && (
            <span className="text-red">
              {typeof error === "object" ? (
                <>
                  {error?.status === 96
                    ? "This user not registered in the Developer Dashboard, please contact me at: alex.martos@hotmail.se"
                    : error.error_description}
                </>
              ) : (
                error
              )}
            </span>
          )}
        </ButtonWrapper>
      </Left>
      <BlobWrapper>
        <img src={blobs1} alt="" />
      </BlobWrapper>
    </Wrapper>
  );
}

export default Login;
