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

// Dados de exemplo para a página de termos de uso
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

// Componente principal da página de termos de uso
function TermosUsoContent() {
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
              Termos de Serviço
            </h1>
            <div className="politica-privacidade-text">
              <p>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              
              <h2>1. INTRODUÇÃO</h2>
              <p>
                A Lompa é uma plataforma online que funciona como um marketplace, fornecendo um espaço para que vendedores e compradores realizem transações comerciais. A empresa responsável pela plataforma é a SHPS Tecnologia e Serviços Ltda. (CNPJ 57.632.888/0001-00). Os serviços da Lompa incluem o site, aplicativos, e todas as ferramentas e conteúdos disponibilizados.
              </p>
              <p>
                Importante destacar que a Lompa atua como intermediária, conectando as partes. O contrato de venda é estabelecido diretamente entre o comprador e o vendedor. A Lompa não faz parte desse contrato e, portanto, não se responsabiliza pela transação, pela qualidade dos produtos, pela garantia ou pela conclusão efetiva da venda. Os serviços de pagamento são processados por uma empresa parceira, a Pagarme, que é a única responsável por essa área. A Lompa pode, a seu critério, pré-avaliar usuários e conteúdos, bem como remover informações ou suspender contas que violem os termos.
              </p>
              <p>
                Ao usar o site, o usuário concorda com todos os Termos de Serviço e com a Política de Privacidade. Para menores de 18 anos, é necessária a permissão e supervisão de um pai ou responsável legal, que será o responsável por todas as atividades na conta.
              </p>
              
              <h2>2. PRIVACIDADE</h2>
              <p>
                A privacidade do usuário é fundamental. A Lompa coleta, usa e processa dados pessoais conforme detalhado em sua Política de Privacidade. Ao utilizar os serviços, o usuário consente com esse tratamento de dados. Os usuários que tiverem acesso aos dados pessoais de outros (por exemplo, um vendedor que recebe os dados de um comprador) devem cumprir todas as leis de proteção de dados e permitir que o outro usuário revise ou remova suas informações coletadas.
              </p>
              
              <h2>3. LICENÇA LIMITADA E PROPRIEDADE INTELECTUAL</h2>
              <p>
                A Lompa concede uma licença limitada e revogável para usar seus serviços. Todo o conteúdo, marcas e logotipos no site são propriedade da Lompa ou de terceiros. É proibido copiar, modificar, distribuir ou criar trabalhos derivados do conteúdo do site sem autorização prévia por escrito.
              </p>
              
              <h2>4. SOFTWARE</h2>
              <p>
                Qualquer software fornecido pela Lompa está sujeito a estes termos. A empresa reserva todos os direitos sobre seu software. Scripts de terceiros são licenciados por seus respectivos proprietários.
              </p>
              
              <h2>5. CONTAS E SEGURANÇA</h2>
              <p>
                Para acessar certas funções, é necessário criar uma conta com ID de usuário e senha. O usuário é inteiramente responsável por manter a confidencialidade de sua senha e por todas as atividades em sua conta. A Lompa pode suspender ou encerrar contas por motivos como inatividade prolongada, violação dos termos, fraude, comportamento abusivo, possuir múltiplas contas ou qualquer atividade que prejudique outros usuários ou a própria empresa. O usuário pode solicitar o encerramento de sua conta, mas permanece responsável por quaisquer transações não finalizadas.
              </p>
              
              <h2>6. TERMO DE USO</h2>
              <p>
                O usuário concorda em não utilizar a plataforma para fins ilegais ou proibidos. Isso inclui, mas não se limita a:
              </p>
              <ul>
                <li>Postar conteúdo ilegal, odioso, ameaçador ou difamatório.</li>
                <li>Violar leis ou direitos de terceiros.</li>
                <li>Personificar outras pessoas ou entidades.</li>
                <li>Manipular preços ou interferir em anúncios de outros.</li>
                <li>Tentar hackear ou fazer engenharia reversa da plataforma.</li>
                <li>Fazer upload de vírus ou código malicioso.</li>
                <li>Anunciar produtos que violem direitos de propriedade intelectual.</li>
              </ul>
              <p>
                A responsabilidade pelo conteúdo postado é exclusiva do usuário que o originou. A Lompa tem o direito (mas não a obrigação) de pré-selecionar, recusar ou remover qualquer conteúdo que viole os termos.
              </p>
              
              <h2>7. VIOLAÇÃO DOS TERMOS DE SERVIÇO</h2>
              <p>
                A violação dos termos pode resultar em diversas ações, como exclusão de anúncios, limitação de privilégios da conta, suspensão ou encerramento da conta, e até mesmo ações civis e criminais.
              </p>
              
              <h2>8. DENÚNCIA DE VIOLAÇÃO DE PROPRIEDADE INTELECTUAL</h2>
              <p>
                A Lompa não permite a venda de produtos que infrinjam direitos de propriedade intelectual (DPI). Proprietários de direitos ou seus agentes autorizados podem denunciar violações por meio do portal "Lompa Brand IP Portal", fornecendo a documentação necessária. Reclamações que não seguirem o procedimento correto poderão não ser analisadas. Os vendedores concordam em isentar a Lompa de qualquer responsabilidade decorrente de reclamações de violação de DPI.
              </p>
              
              <h2>9. COMPRA E PAGAMENTO</h2>
              <p>
                Os pagamentos são processados pela Pagarme e/ou seus parceiros através dos métodos disponibilizados no site. A Lompa não se responsabiliza por perdas decorrentes de informações de pagamento ou envio inseridas incorretamente pelo comprador.
              </p>
              
              <h2>10. SERVIÇOS DE PAGAMENTO E VENDAS INTERNACIONAIS</h2>
              <p>
                Os serviços de pagamento são regidos pelos Termos e Condições da Pagarme. Para compras de vendedores internacionais, o comprador deve concordar com os Termos de Pagamentos Internacionais da Pagarme. Nesses casos, a Pagarme coleta o valor em Reais (BRL) do comprador e o remete ao vendedor internacional em sua moeda local, após a conversão e dedução das taxas aplicáveis.
              </p>
              
              <h2>11. GARANTIA LOMPA</h2>
              <p>
                Para proteger as transações, o pagamento feito pelo comprador fica retido pela Pagarme através da "Garantia Lompa". O valor só é liberado para o vendedor quando:
              </p>
              <ul>
                <li>O comprador confirma o recebimento do produto.</li>
                <li>O Período da Garantia Lompa expira (7 dias após o recebimento confirmado ou 7 dias após a constatação da entrega pelo operador logístico).</li>
                <li>Uma solicitação de devolução/reembolso é resolvida.</li>
              </ul>
              <p>
                A Garantia Lompa só cobre transações realizadas e pagas através da plataforma. Este serviço não constitui uma garantia do produto, que é de responsabilidade do vendedor.
              </p>
              
              <h2>12. SISTEMA DE RECOMPENSAS (MOEDA LOMPA)</h2>
              <p>
                Os usuários podem ganhar "Moedas Lompa" em compras e outras atividades na plataforma. Essas moedas não têm valor monetário, não podem ser compradas ou trocadas por dinheiro, mas podem ser usadas para obter descontos em compras futuras. As moedas têm prazo de validade. A Lompa reserva-se o direito de encerrar ou modificar este sistema a qualquer momento.
              </p>
              
              <h2>13. ENTREGA</h2>
              <p>
                O vendedor deve providenciar o envio do produto dentro do prazo acordado após a confirmação do pagamento. Se a Lompa intermediar o serviço de logística (OFL), ela se responsabiliza por problemas comprovadamente causados pela transportadora. Se o vendedor utilizar um método de envio próprio, a responsabilidade pela entrega e por eventuais problemas é inteiramente sua. As taxas de envio são calculadas com base em peso, medidas e rota, e o custo é apresentado ao usuário antes da finalização da compra.
              </p>
              
              <h2>14. CANCELAMENTO, DEVOLUÇÃO E REEMBOLSO</h2>
              <p>
                O comprador tem até 7 dias após o recebimento do produto para solicitar a devolução e o reembolso sem custos. O cancelamento do pedido é possível antes que o vendedor realize o envio. A Lompa não é responsável por vícios ou inadequações dos produtos, sendo esta uma responsabilidade exclusiva do vendedor. Os reembolsos são feitos, preferencialmente, pelo mesmo método de pagamento original. Se não for possível, a Lompa pode emitir vouchers no valor do reembolso.
              </p>
              
              <h2>15. RESPONSABILIDADES DO VENDEDOR</h2>
              <p>
                O vendedor é o único responsável pela existência, qualidade, legalidade e regularidade dos produtos que anuncia. Ele deve cumprir todas as leis aplicáveis, incluindo a emissão de documentos fiscais. As informações dos anúncios devem ser precisas e atualizadas. O preço dos produtos é determinado pelo vendedor, mas deve incluir todos os impostos e taxas.
              </p>
              
              <h2>16. PUBLICIDADE PAGA</h2>
              <p>
                Vendedores podem comprar serviços de publicidade, como anúncios por palavra-chave ou ofertas relâmpago. Esses serviços são regidos por regras específicas ("Regras de Publicidade Paga"). O pagamento por esses serviços não garante um aumento nas visualizações ou vendas. O vendedor é o único responsável pelo conteúdo de suas ofertas e anúncios.
              </p>
              
              <h2>17. TARIFAS APLICÁVEIS</h2>
              <p>
                A Lompa pode cobrar tarifas pelos serviços prestados, como a "Tarifa de Marketplace", calculada sobre o valor de cada pedido concluído. O usuário autoriza a Lompa a debitar essas tarifas de sua conta. A empresa pode alterar as tarifas, notificando os usuários com 10 dias de antecedência.
              </p>
              
              <h2>18. DISPUTAS</h2>
              <p>
                Em caso de problemas, comprador e vendedor devem tentar resolver a questão por meio de comunicação mútua, com a Lompa facilitando o contato. Se não houver acordo, os usuários podem recorrer aos tribunais competentes ou solicitar a ajuda da Lompa para mediar a disputa, se a compra estiver coberta pela Garantia Lompa.
              </p>
              
              <h2>19. ISENÇÃO DE RESPONSABILIDADE E LIMITAÇÕES</h2>
              <p>
                A responsabilidade da Lompa é estritamente limitada aos serviços de intermediação que oferece. A plataforma é fornecida "como está", sem garantias de que estará sempre disponível, segura ou livre de erros. A Lompa não tem controle e não assume responsabilidade pela qualidade, segurança ou legalidade dos produtos anunciados, nem pela capacidade dos vendedores de vender ou dos compradores de pagar. A empresa não será responsável por danos indiretos, lucros cessantes ou perdas de dados resultantes do uso ou da incapacidade de usar o site.
              </p>
              
              <h2>20. DISPOSIÇÕES GERAIS</h2>
              <p>
                Estes Termos de Serviço são regidos pelas leis do Brasil. Disputas entre a Lompa e Vendedores serão resolvidas por arbitragem em São Paulo. Disputas envolvendo Compradores serão submetidas à jurisdição dos tribunais de São Paulo ou do domicílio do consumidor. A Lompa pode modificar os termos a qualquer momento, e o uso contínuo da plataforma constitui aceitação das novas regras.
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
export default function TermosUsoPage() {
  return (
    <MobileProvider>
      <CardRefsProvider>
        <TermosUsoContent />
      </CardRefsProvider>
    </MobileProvider>
  )
} 