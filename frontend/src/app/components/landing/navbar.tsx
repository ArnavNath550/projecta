import Button from '@/app/packages/ui/button'
import { API_ENDPOINT, postDataMethod } from '@/app/services/api';
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

function Navbar() {
    const { data: session } = useSession();

  React.useEffect(() => {
    if (session) { 
      const userData = {
        userId: session.user?.id,
        email: session.user?.email || '',
        firstName: session.user?.name?.split(' ')[0] || 'DefaultFirstName',
        lastName: session.user?.name?.split(' ')[1] || 'DefaultLastName',
      };

      console.log(`userData`, userData);

      postDataMethod(API_ENDPOINT + '/auth/login', userData)
        .then((data) => {
          window.location.href = "/client";
        })
        .catch((error) => {
          console.error('Error saving user:', error);
        });
    }
    console.log(session?.user);
  }, [session]);
  return (
    <div className="w-full p-5 fixed w-full bg-background z-[1000]">
        <div className="flex flex-row items-center justify-between max-w-[900px] w-full m-auto">
            <div className="navbar-logo">
                <svg width="150" height="35" viewBox="0 0 289 81" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_2_161" maskUnits="userSpaceOnUse" x="0" y="4" width="71" height="72"><path d="M70.5033 4.85681H0V75.8091H70.5033V4.85681Z" fill="white"></path></mask><g mask="url(#mask0_2_161)"><path d="M52.8774 4.85681H17.6258C7.89135 4.85681 0 12.7985 0 22.5949V58.071C0 67.8676 7.89135 75.8092 17.6258 75.8092H52.8774C62.612 75.8092 70.5033 67.8676 70.5033 58.071V22.5949C70.5033 12.7985 62.612 4.85681 52.8774 4.85681Z" fill="#7368F4"></path><path d="M33.2252 28.9723C34.496 28.3101 36.0072 28.3101 37.278 28.9723L52.3718 36.8385C55.5453 38.4925 55.5453 43.0604 52.3718 44.7143L37.278 52.5805C36.0072 53.2427 34.496 53.2427 33.2252 52.5805L18.1313 44.7143C14.9579 43.0604 14.9579 38.4925 18.1313 36.8385L33.2252 28.9723Z" fill="#CAC5FF" fill-opacity="0.8"></path><path d="M33.2252 35.1807C34.496 34.5185 36.0072 34.5185 37.278 35.1807L52.3718 43.0469C55.5453 44.7008 55.5453 49.2687 52.3718 50.9227L37.278 58.7889C36.0072 59.4511 34.496 59.4511 33.2252 58.7889L18.1313 50.9227C14.9579 49.2687 14.9579 44.7008 18.1313 43.0469L33.2252 35.1807Z" fill="#CAC5FF" fill-opacity="0.6"></path><path d="M33.2252 21.8771C34.496 21.2148 36.0072 21.2148 37.278 21.8771L52.3718 29.7434C55.5453 31.3973 55.5453 35.9652 52.3718 37.619L37.278 45.4852C36.0072 46.1475 34.496 46.1475 33.2252 45.4852L18.1313 37.619C14.9579 35.9652 14.9579 31.3973 18.1313 29.7434L33.2252 21.8771Z" fill="white"></path></g><path d="M101.194 25.2544H115.2C117.453 25.2544 119.29 25.5805 120.713 26.2326C122.136 26.8847 123.233 27.6998 124.003 28.678C124.774 29.6561 125.293 30.7232 125.559 31.8792C125.856 33.0352 126.004 34.1023 126.004 35.0804C126.004 36.0586 125.856 37.1257 125.559 38.2817C125.293 39.408 124.774 40.4603 124.003 41.4384C123.233 42.4166 122.136 43.2317 120.713 43.8838C119.29 44.5063 117.453 44.8175 115.2 44.8175H106.752V57H101.194V25.2544ZM106.752 40.2824H114.889C115.511 40.2824 116.148 40.1935 116.8 40.0157C117.453 39.8378 118.045 39.5562 118.579 39.1709C119.142 38.7559 119.587 38.2224 119.913 37.5703C120.268 36.8885 120.446 36.0438 120.446 35.036C120.446 33.9985 120.298 33.1389 120.002 32.4572C119.705 31.7755 119.305 31.2419 118.801 30.8566C118.297 30.4416 117.719 30.16 117.067 30.0118C116.415 29.8636 115.719 29.7895 114.978 29.7895H106.752V40.2824ZM130.139 34.0134H134.896V38.4595H134.985C135.133 37.837 135.415 37.2294 135.83 36.6366C136.274 36.0438 136.793 35.5102 137.386 35.036C138.008 34.5321 138.69 34.1319 139.431 33.8355C140.172 33.5391 140.928 33.3909 141.699 33.3909C142.291 33.3909 142.692 33.4057 142.899 33.4354C143.136 33.465 143.373 33.4946 143.61 33.5243V38.415C143.255 38.3558 142.884 38.3113 142.499 38.2817C142.143 38.2224 141.788 38.1927 141.432 38.1927C140.572 38.1927 139.757 38.3706 138.986 38.7263C138.245 39.0523 137.593 39.5562 137.03 40.238C136.467 40.8901 136.022 41.7052 135.696 42.6834C135.37 43.6615 135.207 44.7879 135.207 46.0624V57H130.139V34.0134ZM155.525 57.6224C153.688 57.6224 152.043 57.326 150.59 56.7332C149.167 56.1107 147.952 55.266 146.944 54.1989C145.966 53.1318 145.21 51.8573 144.677 50.3752C144.173 48.8931 143.921 47.2629 143.921 45.4844C143.921 43.7356 144.173 42.1202 144.677 40.6381C145.21 39.1561 145.966 37.8815 146.944 36.8144C147.952 35.7474 149.167 34.9174 150.59 34.3246C152.043 33.7021 153.688 33.3909 155.525 33.3909C157.363 33.3909 158.993 33.7021 160.416 34.3246C161.869 34.9174 163.084 35.7474 164.062 36.8144C165.07 37.8815 165.826 39.1561 166.33 40.6381C166.863 42.1202 167.13 43.7356 167.13 45.4844C167.13 47.2629 166.863 48.8931 166.33 50.3752C165.826 51.8573 165.07 53.1318 164.062 54.1989C163.084 55.266 161.869 56.1107 160.416 56.7332C158.993 57.326 157.363 57.6224 155.525 57.6224ZM155.525 53.6209C156.652 53.6209 157.63 53.3838 158.46 52.9095C159.29 52.4353 159.972 51.8128 160.505 51.0421C161.039 50.2715 161.424 49.4119 161.661 48.4634C161.928 47.4852 162.061 46.4922 162.061 45.4844C162.061 44.5063 161.928 43.5281 161.661 42.55C161.424 41.5718 161.039 40.7122 160.505 39.9712C159.972 39.2005 159.29 38.5781 158.46 38.1038C157.63 37.6296 156.652 37.3924 155.525 37.3924C154.399 37.3924 153.421 37.6296 152.591 38.1038C151.761 38.5781 151.079 39.2005 150.546 39.9712C150.012 40.7122 149.612 41.5718 149.345 42.55C149.108 43.5281 148.99 44.5063 148.99 45.4844C148.99 46.4922 149.108 47.4852 149.345 48.4634C149.612 49.4119 150.012 50.2715 150.546 51.0421C151.079 51.8128 151.761 52.4353 152.591 52.9095C153.421 53.3838 154.399 53.6209 155.525 53.6209ZM171.477 25.2544H176.546V30.0563H171.477V25.2544ZM171.477 34.0134H176.546V58.9563C176.546 61.2386 176.042 63.0023 175.034 64.2472C174.026 65.4921 172.337 66.1146 169.965 66.1146C169.461 66.1146 169.032 66.0998 168.676 66.0701C168.35 66.0405 168.024 65.996 167.698 65.9367V61.9352C168.024 61.9945 168.335 62.0389 168.632 62.0686C168.928 62.0982 169.195 62.113 169.432 62.113C170.351 62.113 170.914 61.8315 171.121 61.2683C171.358 60.7051 171.477 59.8603 171.477 58.734V34.0134ZM197.852 43.4837C197.793 42.6834 197.615 41.9127 197.319 41.1717C197.052 40.4306 196.666 39.7934 196.163 39.2598C195.688 38.6966 195.095 38.252 194.384 37.926C193.702 37.5703 192.932 37.3924 192.072 37.3924C191.183 37.3924 190.368 37.5555 189.627 37.8815C188.915 38.1779 188.293 38.6077 187.759 39.1709C187.255 39.7044 186.84 40.3417 186.514 41.0827C186.218 41.8238 186.055 42.6241 186.025 43.4837H197.852ZM186.025 46.8183C186.025 47.7075 186.144 48.5671 186.381 49.397C186.648 50.227 187.033 50.9532 187.537 51.5757C188.041 52.1981 188.678 52.702 189.449 53.0874C190.22 53.443 191.138 53.6209 192.205 53.6209C193.688 53.6209 194.873 53.3097 195.762 52.6872C196.681 52.0351 197.363 51.0718 197.808 49.7972H202.609C202.343 51.0421 201.883 52.1537 201.231 53.1318C200.579 54.11 199.794 54.9399 198.875 55.6217C197.956 56.2738 196.918 56.7628 195.762 57.0889C194.636 57.4446 193.45 57.6224 192.205 57.6224C190.397 57.6224 188.797 57.326 187.404 56.7332C186.011 56.1404 184.825 55.3104 183.847 54.2434C182.898 53.1763 182.172 51.9017 181.668 50.4197C181.194 48.9376 180.957 47.3074 180.957 45.5289C180.957 43.8986 181.209 42.3573 181.713 40.9049C182.246 39.4228 182.987 38.1335 183.936 37.0367C184.914 35.9104 186.085 35.0211 187.448 34.369C188.812 33.7169 190.353 33.3909 192.072 33.3909C193.88 33.3909 195.496 33.7762 196.918 34.5469C198.371 35.2879 199.571 36.2809 200.52 37.5258C201.468 38.7707 202.15 40.2083 202.565 41.8386C203.01 43.4392 203.128 45.0991 202.921 46.8183H186.025ZM222.291 41.7052C222.084 40.2824 221.506 39.2154 220.557 38.504C219.638 37.7629 218.467 37.3924 217.045 37.3924C216.392 37.3924 215.696 37.511 214.955 37.7481C214.214 37.9556 213.532 38.3706 212.91 38.993C212.287 39.5859 211.768 40.4306 211.353 41.5274C210.939 42.5944 210.731 44.0024 210.731 45.7512C210.731 46.6997 210.835 47.6482 211.042 48.5967C211.279 49.5453 211.635 50.39 212.109 51.131C212.613 51.8721 213.251 52.4797 214.021 52.954C214.792 53.3986 215.726 53.6209 216.822 53.6209C218.304 53.6209 219.52 53.1615 220.468 52.2426C221.446 51.3237 222.054 50.0343 222.291 48.3744H227.36C226.885 51.3682 225.744 53.6654 223.936 55.266C222.158 56.8369 219.786 57.6224 216.822 57.6224C215.014 57.6224 213.414 57.326 212.02 56.7332C210.657 56.1107 209.501 55.2808 208.552 54.2434C207.604 53.1763 206.878 51.9165 206.374 50.4641C205.9 49.0117 205.662 47.4407 205.662 45.7512C205.662 44.032 205.9 42.4166 206.374 40.9049C206.848 39.3932 207.559 38.089 208.508 36.9923C209.456 35.8659 210.627 34.9915 212.02 34.369C213.443 33.7169 215.103 33.3909 217 33.3909C218.334 33.3909 219.594 33.5687 220.779 33.9244C221.995 34.2505 223.062 34.7544 223.981 35.4361C224.929 36.1179 225.7 36.9775 226.293 38.0149C226.885 39.0523 227.241 40.2824 227.36 41.7052H222.291ZM229.168 34.0134H232.991V27.1218H238.06V34.0134H242.639V37.7926H238.06V50.064C238.06 50.5975 238.075 51.0569 238.104 51.4423C238.164 51.8276 238.267 52.1537 238.416 52.4204C238.593 52.6872 238.845 52.8947 239.171 53.0429C239.498 53.1615 239.942 53.2207 240.505 53.2207C240.861 53.2207 241.217 53.2207 241.572 53.2207C241.928 53.1911 242.284 53.1318 242.639 53.0429V56.9555C242.076 57.0148 241.528 57.0741 240.994 57.1334C240.461 57.1926 239.913 57.2223 239.349 57.2223C238.015 57.2223 236.934 57.1037 236.104 56.8666C235.303 56.5998 234.666 56.2293 234.192 55.755C233.747 55.2511 233.436 54.6287 233.258 53.8877C233.11 53.1466 233.021 52.3019 232.991 51.3534V37.7926H229.168V34.0134ZM246.686 50.9977H252.866V57H246.686V50.9977ZM267.864 25.2544H273.777L286.004 57H280.046L277.067 48.5967H264.396L261.417 57H255.681L267.864 25.2544ZM265.907 44.3729H275.6L270.843 30.7232H270.709L265.907 44.3729Z" fill="white"></path></svg>
            </div>
            <div className="flex flex-row gap-10 items-center justify-center">
                <div className="font-normal cursor-pointer">
                    Home
                </div>
                <div className="font-normal cursor-pointer">
                    Products
                </div>
                <div className="font-normal cursor-pointer">
                    Features
                </div>
                <div>
                    <Button intent="primary" size="base" onClick={() => signIn('google')}>
                        Open App
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar