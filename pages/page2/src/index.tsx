import { FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { Render, Provider, Container, useStore } from 'react-login-page';
import { Email } from './control/Email';
import { Password } from './control/Password';
import { Submit } from './control/Submit';
import { Reset } from './control/Reset';
import { ButtonAfter } from './control/ButtonAfter';
import { Logo } from './control/Logo';
import { Title } from './control/Title';
import { Banner } from './control/Banner';

import './index.css';

export * from 'react-login-page';
export * from './control/Email';
export * from './control/ButtonAfter';
export * from './control/Password';
export * from './control/Submit';
export * from './control/Reset';
export * from './control/Title';
export * from './control/Logo';
export * from './control/Banner';

const RenderLogin = () => {
  const { blocks = {}, extra = {}, data } = useStore();
  const { fields, buttons } = data || { fields: [] };
  return (
    <Render>
      <div className="login-page2-inner">
        <aside>
          {blocks.banner}
        </aside>
        <main>
          <header>
            {blocks.logo} {blocks.title}
          </header>
          {fields.sort((a, b) => a.index - b.index).map((item, idx) => {
            if (!item.children) return null;
            return <label key={item.name + idx}>{extra[item.name]} {item.children}</label>
          })}
          <section>
            {buttons.sort((a, b) => a.index - b.index).map((item, idx) => {
              const child = item.children;
              if (!isValidElement(child)) return null;
              return cloneElement(child, {
                ...child.props,
                key: item.name + idx,
              })
            })}
          </section>
          {blocks.buttonAfter}
        </main>
      </div>
    </Render>
  );
};

const LoginPage: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...divProps
}) => {
  return (
    <Provider>
      <Banner />
      <Email />
      <Password />
      <Logo />
      <Title />
      <Submit />
      <Container {...divProps} className={`login-page2 ${className || ''}`}>
        <RenderLogin />
      </Container>
      {children}
    </Provider>
  );
};

type LoginComponent = FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> & {
  Email: typeof Email;
  Password: typeof Password;
  Submit: typeof Submit;
  Reset: typeof Reset;
  ButtonAfter: typeof ButtonAfter;
  Logo: typeof Logo;
  Banner: typeof Banner;
  Title: typeof Title;
};

const Login = LoginPage as LoginComponent

Login.Email =  Email;
Login.Password =  Password;
Login.Submit =  Submit;
Login.Reset =  Reset;
Login.ButtonAfter =  ButtonAfter;
Login.Logo =  Logo;
Login.Banner =  Banner;
Login.Title =  Title;
Login.displayName = 'LoginPage';

export default Login;
