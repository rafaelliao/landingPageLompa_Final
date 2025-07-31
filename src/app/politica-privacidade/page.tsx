'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackgroundCircles from '@/components/BackgroundCircles'
import MainLayout from '@/components/MainLayout'
import { MobileProvider } from '@/contexts/MobileContext'
import { CardRefsProvider } from '@/contexts/CardRefsContext'
import { useResponsive } from '@/hooks/useResponsive'

import type { NavItem, FooterSection } from '@/types'

// Dados de exemplo para a página de política de privacidade
const navigationItems: NavItem[] = []

const footerSections: FooterSection[] = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#features' },
      { label: 'Preços', href: '#pricing' },
      { label: 'Integrações', href: '#integrations' },
      { label: 'API', href: '#api' },
      { label: 'Documentação', href: '#docs', external: true }
    ]
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '#about' },
      { label: 'Carreiras', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Imprensa', href: '#press' },
      { label: 'Parceiros', href: '#partners' }
    ]
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', href: '#help' },
      { label: 'Comunidade', href: '#community' },
      { label: 'Status', href: '#status' },
      { label: 'Contato', href: '#contact' },
      { label: 'Feedback', href: '#feedback' }
    ]
  }
]

// Componente principal da página de política de privacidade
function PoliticaPrivacidadeContent() {
  const { isMobile } = useResponsive()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="politica-privacidade-page">
      {/* Background Circles */}
      <BackgroundCircles />
      
      {/* Navigation */}
      <Navigation items={navigationItems} />
      
      {/* Conteúdo principal */}
      <MainLayout>
        <div className="politica-privacidade-container">
          <div className="politica-privacidade-content">
            <h1 className="politica-privacidade-title">
              Política de Privacidade
            </h1>
            <div className="politica-privacidade-text">
              <p>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              
                                   <h2>1. Introdução</h2>
                     <p>
                       O Lompa Marketplace Ltda, inscrito no CNPJ nº 57.632.888/0001-00, é o responsável pela administração da plataforma Lompa e se compromete a proteger a privacidade e os dados pessoais de seus usuários, sejam compradores ou vendedores. Esta Política de Privacidade descreve como o Lompa coleta, utiliza, armazena e processa dados pessoais, como nome, informações de contato e documentos de identificação.
                     </p>
                     <p>
                       Ao acessar ou utilizar a plataforma e os serviços, o usuário concorda com os termos desta política. Caso não concorde, deve se abster de utilizar os serviços. O Lompa poderá alterar esta política a qualquer momento, e o uso contínuo da plataforma será interpretado como aceitação das mudanças.
                     </p>
                     <p>
                       Esta política complementa outros regulamentos e cláusulas contratuais relacionadas ao tratamento de dados pessoais e aplica-se a todos os usuários da plataforma. O Lompa poderá coletar dados pessoais em diversas situações, como: criação de conta, preenchimento de formulários, transações, interações com o suporte, uso do site ou aplicativo (incluindo cookies), envio de feedback, participação em concursos ou qualquer outra comunicação direta com o Lompa.
                     </p>
              
                             <h2>2. Informações que Coletamos</h2>
               <p>
                 O Lompa poderá coletar diversos dados pessoais dos usuários, incluindo, mas não se limitando a:
               </p>
               <p>
                 • nome;<br/>
                 • endereço de e-mail;<br/>
                 • data de nascimento;<br/>
                 • endereço de cobrança ou de entrega;<br/>
                 • conta bancária e informações de pagamento;<br/>
                 • número de telefone;<br/>
                 • sexo;<br/>
                 • informações associadas aos dispositivos utilizados para acessar os serviços do Lompa;<br/>
                 • dados da rede de internet utilizada, bem como informações sobre contas e contatos com os quais o usuário tenha interagido;<br/>
                 • gravações e arquivos de foto, áudio ou vídeo.
               </p>
               <p>
                 O Lompa exige que os dados fornecidos sejam verdadeiros e atualizados. O usuário compromete-se a não enviar informações imprecisas ou enganosas e deve informar o Lompa sobre quaisquer alterações ou correções necessárias. O Lompa poderá solicitar documentação adicional para verificação das informações.
               </p>
               <p>
                 Caso o usuário utilize sua conta de mídia social para se cadastrar ou interagir com a plataforma, o Lompa poderá acessar dados compartilhados com esse provedor, conforme permitido pelas políticas da respectiva rede social, respeitando sempre esta Política de Privacidade.
               </p>
               <p>
                 O usuário pode optar por não fornecer determinadas informações, notificando formalmente o Diretor de Proteção de Dados do Lompa. No entanto, a retirada do consentimento pode limitar o uso de funcionalidades da plataforma, como, por exemplo, recursos que dependem da localização do dispositivo.
               </p>
              
                             <h2>3. Como Usamos suas Informações</h2>
               <p>
                 O Lompa poderá coletar, utilizar, divulgar e processar seus dados pessoais para as seguintes finalidades:
               </p>
               <p>
                 • processar seu cadastro, transações ou interações por meio da plataforma ou com terceiros;<br/>
                 • gerenciar sua conta e experiência na plataforma do Lompa, incluindo preferências e suporte;<br/>
                 • responder a solicitações, transações e notificações sobre sua conta;<br/>
                 • garantir o cumprimento dos Termos de Serviço e contratos aplicáveis;<br/>
                 • realizar identificação, verificação, auditorias e procedimentos de prevenção à fraude e lavagem de dinheiro;<br/>
                 • realizar análises de risco de crédito, inclusive com parceiros terceiros para ofertas de crédito;<br/>
                 • manter atualizações e suporte de software para o bom funcionamento dos serviços;<br/>
                 • prestar atendimento ao cliente e executar instruções recebidas de você;<br/>
                 • entrar em contato por diferentes meios (voz, SMS, e-mail, correio, etc.) para fins administrativos e operacionais;<br/>
                 • permitir interações entre usuários na plataforma, como mensagens e comentários;<br/>
                 • realizar pesquisas e análises sobre o uso da plataforma, com foco na melhoria da experiência e recomendação de produtos e serviços;<br/>
                 • realizar auditorias e pesquisas para entender melhor o público e a experiência de uso;<br/>
                 • enviar comunicações de marketing e materiais promocionais sobre produtos e serviços do Lompa ou de parceiros — o usuário pode optar por não receber essas comunicações;<br/>
                 • cumprir exigências legais, regulatórias ou judiciais;<br/>
                 • elaborar relatórios estatísticos e cumprir obrigações de registros;<br/>
                 • realizar verificações de antecedentes ou outras diligências legais ou regulatórias;<br/>
                 • auditar os serviços e operações do Lompa;<br/>
                 • investigar violações dos Termos de Serviço, fraudes ou condutas ilegais;<br/>
                 • armazenar, hospedar ou fazer backup dos dados pessoais, inclusive fora da jurisdição do usuário;<br/>
                 • viabilizar transações comerciais que envolvam o Lompa ou empresas relacionadas;<br/>
                 • e quaisquer outras finalidades informadas no momento da coleta dos dados, mediante seu consentimento.
               </p>
               <p>
                 O usuário reconhece e concorda que o Lompa poderá acessar, preservar e divulgar suas informações pessoais e conteúdos sempre que necessário para cumprir obrigações legais, responder a autoridades competentes, proteger seus direitos ou os de terceiros, atender solicitações do próprio usuário, ou garantir a segurança da plataforma e seus usuários.
               </p>
               <p>
                 Caso surjam novas finalidades além das descritas, o Lompa informará o usuário no momento da coleta, salvo quando o tratamento for permitido pelas Leis de Privacidade mesmo sem consentimento prévio.
               </p>
              
                             <h2>4. Compartilhamento de Informações</h2>
               <p>
                 O Lompa poderá compartilhar, processar e transferir seus dados pessoais com terceiros — como fornecedores, agentes, afiliadas e empresas relacionadas — localizados no Brasil ou no exterior, sempre com o objetivo de viabilizar os serviços e finalidades descritas nesta Política. O Lompa adota medidas para garantir que esses terceiros protejam seus dados contra acessos e usos não autorizados, retendo-os apenas pelo tempo necessário para os propósitos contratados.
               </p>
               <p>
                 Os dados poderão ser compartilhados com:
               </p>
               <p>
                 • afiliadas, subsidiárias e empresas do grupo Lompa;<br/>
                 • compradores ou vendedores com os quais o usuário interagir na plataforma;<br/>
                 • outros usuários, conforme funcionalidades da plataforma;<br/>
                 • parceiros de logística, meios de pagamento, marketing, TI, telecomunicações e data centers;<br/>
                 • autoridades públicas e reguladores, conforme obrigação legal ou regulatória;<br/>
                 • sucessores do Lompa em caso de fusão, aquisição, reestruturação ou venda de ativos;<br/>
                 • terceiros envolvidos em transações comerciais ou operações corporativas nas quais o Lompa participe.
               </p>
               <p>
                 O Lompa também poderá compartilhar dados estatísticos e demográficos com parceiros de publicidade e fornecedores de remarketing.
               </p>
               <p>
                 Além disso, conforme permitido por lei, o Lompa poderá tratar dados pessoais sem consentimento em situações específicas, como obrigações legais, execução contratual, legítimo interesse ou ações judiciais.
               </p>
               <p>
                 O Lompa alerta que, apesar de adotar medidas de segurança, não pode garantir proteção absoluta contra acessos não autorizados (por exemplo, ações de hackers). No entanto, manterá os padrões exigidos pelas Leis de Privacidade.
               </p>
               <p>
                 Nos territórios onde estiver disponível, o Lompa poderá permitir o compartilhamento de vídeos via YouTube no recurso Lompa Livestream. Para isso, utiliza APIs do YouTube e o uso está sujeito à Política de Privacidade do Google.
               </p>
               <p>
                 Conforme os Termos de Serviço, qualquer Usuário que acesse dados pessoais de outro por meio da plataforma (a "Parte Receptora") se compromete a:
               </p>
               <p>
                 • cumprir as Leis de Privacidade;<br/>
                 • excluir os dados mediante solicitação da Lompa ou da parte titular (a "Parte Divulgadora");<br/>
                 • permitir auditoria sobre os dados coletados;
               </p>
               <p>
                 Para Vendedores, há obrigações adicionais:
               </p>
               <p>
                 • usar dados do comprador apenas com consentimento e para fins legítimos da transação;<br/>
                 • não contatar compradores fora da plataforma;<br/>
                 • não compartilhar dados do comprador com terceiros não autorizados;<br/>
                 • proteger adequadamente os dados e deletá-los quando não forem mais necessários;<br/>
                 • informar o Diretor de Proteção de Dados do Lompa (dpo.br@lompa.com) sobre qualquer vazamento ou incidente de segurança.
               </p>
               <p>
                 O Lompa reforça seu compromisso com a privacidade e exige que todos os envolvidos na cadeia de tratamento de dados pessoais sigam os mesmos princípios.
               </p>
              
                             <h2>5. Informações coletadas por terceiros</h2>
               <p>
                 O Lompa utiliza ferramentas como o Google Analytics, um serviço de análise fornecido pelo Google Inc., para entender como os usuários interagem com a plataforma. Essa ferramenta utiliza cookies — arquivos de texto armazenados no seu dispositivo — para coletar informações sobre o uso da plataforma, incluindo seu endereço IP. Esses dados são transmitidos e armazenados em servidores do Google nos Estados Unidos.
               </p>
               <p>
                 As informações coletadas são utilizadas para:
               </p>
               <p>
                 • analisar o uso da plataforma;<br/>
                 • gerar relatórios de desempenho e uso;<br/>
                 • fornecer serviços relacionados à navegação e comportamento dos usuários.
               </p>
               <p>
                 O Google poderá compartilhar essas informações com terceiros em conformidade com obrigações legais ou quando subcontratar o processamento. No entanto, o Google não associará seu endereço IP a outros dados por ele armazenados.
               </p>
               <p>
                 Além disso, o Lompa e terceiros poderão oferecer aplicativos de software para download e uso na plataforma. Esses aplicativos podem:
               </p>
               <p>
                 • acessar e expor informações identificáveis como nome, ID de usuário, endereço IP e cookies;<br/>
                 • solicitar informações adicionais diretamente ao usuário;<br/>
                 • permitir que terceiros visualizem ou processem esses dados.
               </p>
               <p>
                 Esses aplicativos e os serviços oferecidos por terceiros não são de propriedade nem estão sob controle do Lompa. Portanto, o Lompa recomenda fortemente que os usuários leiam atentamente os termos de uso e políticas de privacidade desses terceiros, pois o uso desses serviços está sujeito às regras estabelecidas por eles.
               </p>
              
                             <h2>6. Isenção de responsabilidade relativa à segurança e sites de terceiros</h2>
               <p>
                 O Lompa adota diversas medidas de segurança para proteger os dados pessoais sob sua responsabilidade, como redes protegidas, acesso restrito a pessoas autorizadas e criptografia de informações sensíveis. No entanto, não garante a segurança de dados pessoais fornecidos por você em sites de terceiros.
               </p>
               <p>
                 A plataforma pode conter links ou integrações com sites externos, inclusive por meio de parcerias, marcas conjuntas ou recursos de comércio eletrônico. Esses sites possuem políticas de privacidade, práticas de segurança e coleta de dados independentes, sobre as quais o Lompa não possui controle, ainda que sejam de parceiros ou afiliados.
               </p>
               <p>
                 Portanto, o Lompa não se responsabiliza pelo conteúdo, segurança ou atividades desses sites externos. O acesso a esses sites é de responsabilidade do usuário, que o faz por sua conta e risco. O Lompa, no entanto, se compromete a manter a integridade da sua própria plataforma e agradece qualquer feedback caso um link esteja com problemas ou leve a conteúdo impróprio.
               </p>
              
              <h2>7. Seus Direitos</h2>
              <p>
                Dependendo de sua localização, você pode ter os seguintes direitos relacionados às suas informações pessoais:
              </p>
              <p>
                • <strong>Acesso:</strong> Solicitar informações sobre quais dados pessoais mantemos sobre você<br/>
                • <strong>Correção:</strong> Solicitar a correção de dados pessoais imprecisos<br/>
                • <strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais<br/>
                • <strong>Portabilidade:</strong> Receber seus dados em formato estruturado<br/>
                • <strong>Oposição:</strong> Opor-se ao processamento de seus dados pessoais<br/>
                • <strong>Restrição:</strong> Solicitar a limitação do processamento de seus dados
              </p>
              
                             <h2>8. Cookies e Tecnologias Similares</h2>
               <p>
                 O Lompa, juntamente com provedores e parceiros autorizados, pode periodicamente utilizar cookies e tecnologias semelhantes para coletar ou compartilhar informações sobre como você utiliza a plataforma e os serviços. Esses recursos ajudam a:
               </p>
               <p>
                 • melhorar a experiência do usuário na plataforma;<br/>
                 • desenvolver novos serviços e funcionalidades;<br/>
                 • oferecer conteúdo e anúncios mais relevantes, inclusive por meio de estratégias de remarketing.
               </p>
               <p>
                 Os cookies são pequenos identificadores armazenados no seu computador ou dispositivo móvel que registram dados como: horários de acesso, frequência de uso, itens visualizados ou adicionados ao carrinho, entre outras atividades. O Lompa pode associar essas informações aos seus dados pessoais, com o objetivo de personalizar sua experiência, acompanhar seu carrinho de compras e realizar análises de uso da plataforma.
               </p>
               <p>
                 Você pode recusar o uso de cookies ajustando as configurações do seu navegador ou dispositivo. No entanto, ao fazer isso, algumas funcionalidades da plataforma ou dos serviços podem não funcionar corretamente.
               </p>
              
              
              
              <h2>10. Menores de Idade</h2>
              <p>
                Nossos serviços não são destinados a menores de 13 anos. Não coletamos intencionalmente informações pessoais de menores de 13 anos. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco imediatamente.
              </p>
              
              
              
                             <h2>12. Contato</h2>
               <p>
                 Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco:
               </p>
               <p>
                 <strong>E-mail:</strong> contato@lompa.com.br<br/>
                 <strong>Telefone:</strong> +55 11 93438-0061
               </p>
              
              <h2>13. Lei Aplicável</h2>
              <p>
                Esta Política de Privacidade é regida pelas leis brasileiras, especialmente a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Qualquer disputa relacionada a esta política será resolvida nos tribunais competentes do Brasil.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
      
      {/* Footer */}
      <Footer sections={footerSections} />
    </div>
  )
}

// Componente principal da página
export default function PoliticaPrivacidadePage() {
  return (
    <MobileProvider>
      <CardRefsProvider>
        <PoliticaPrivacidadeContent />
      </CardRefsProvider>
    </MobileProvider>
  )
} 