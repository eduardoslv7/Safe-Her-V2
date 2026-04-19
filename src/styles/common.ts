import { StyleSheet } from 'react-native';
// Importa cores, espaçamentos, bordas e tamanhos de fonte do arquivo 'colors'
import { colors, spacing, borderRadius, fontSize } from './colors';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1, // Preenche o espaço disponível na tela
    backgroundColor: colors.gray[50], // Cor de fundo cinza claro
  },
  centerContainer: {
    flex: 1, // Preenche o espaço disponível
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    padding: spacing.lg, // Espaçamento grande
  },
  scrollContainer: {
    flexGrow: 1, // Permite que o container role e ocupe o tamanho necessário
  },
  
  // Cards
  card: {
    backgroundColor: colors.white, // Cor de fundo do card
    borderRadius: borderRadius.xl, // Bordas arredondadas grandes
    padding: spacing.lg, // Espaçamento grande dentro do card
    shadowColor: colors.black, // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 3, // Elevação para Android (sombra)
  },
  cardPink: {
    backgroundColor: colors.white, // Cor de fundo do card
    borderRadius: borderRadius.xl, // Bordas arredondadas grandes
    padding: spacing.lg, // Espaçamento grande dentro do card
    borderWidth: 2, // Borda ao redor do card
    borderColor: colors.pink[200], // Cor da borda (rosa claro)
    shadowColor: colors.pink[500], // Cor da sombra (rosa)
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 3, // Elevação para Android (sombra)
  },
  
  // Buttons
  button: {
    borderRadius: borderRadius.lg, // Bordas arredondadas médias
    padding: spacing.md, // Espaçamento médio
    alignItems: 'center', // Alinha o conteúdo no centro horizontalmente
    justifyContent: 'center', // Alinha o conteúdo no centro verticalmente
  },
  buttonPrimary: {
    backgroundColor: colors.pink[500], // Cor de fundo do botão primário (rosa)
    borderRadius: borderRadius.lg, // Bordas arredondadas médias
    paddingVertical: spacing.md, // Espaçamento vertical
    paddingHorizontal: spacing.lg, // Espaçamento horizontal
    alignItems: 'center', // Alinha o conteúdo no centro horizontalmente
    justifyContent: 'center', // Alinha o conteúdo no centro verticalmente
  },
  buttonText: {
    color: colors.white, // Cor do texto (branco)
    fontSize: fontSize.base, // Tamanho da fonte
    fontWeight: '600', // Peso da fonte (semibold)
  },
  buttonTextPrimary: {
    color: colors.white, // Cor do texto no botão primário (branco)
    fontSize: fontSize.base, // Tamanho da fonte
    fontWeight: '600', // Peso da fonte (semibold)
  },
  
  // Inputs
  input: {
    backgroundColor: colors.white, // Cor de fundo do campo de texto
    borderWidth: 2, // Largura da borda
    borderColor: colors.pink[200], // Cor da borda (rosa claro)
    borderRadius: borderRadius.lg, // Bordas arredondadas médias
    paddingHorizontal: spacing.md, // Espaçamento horizontal dentro do input
    paddingVertical: spacing.md, // Espaçamento vertical dentro do input
    fontSize: fontSize.base, // Tamanho da fonte
    color: colors.gray[900], // Cor do texto (cinza escuro)
  },
  inputFocused: {
    borderColor: colors.pink[500], // Cor da borda quando o campo está focado (rosa escuro)
  },
  inputError: {
    borderColor: colors.red[500], // Cor da borda em caso de erro (vermelho)
  },
  
  // Text
  heading1: {
    fontSize: fontSize['3xl'], // Tamanho da fonte extra grande
    fontWeight: '700', // Texto em negrito (bold)
    color: colors.pink[600], // Cor do título (rosa)
    marginBottom: spacing.sm, // Margem inferior pequena
  },
  heading2: {
    fontSize: fontSize['2xl'], // Tamanho da fonte grande
    fontWeight: '600', // Peso da fonte semibold
    color: colors.pink[600], // Cor do título (rosa)
    marginBottom: spacing.sm, // Margem inferior pequena
  },
  heading3: {
    fontSize: fontSize.xl, // Tamanho da fonte médio
    fontWeight: '600', // Peso da fonte semibold
    color: colors.pink[600], // Cor do título (rosa)
    marginBottom: spacing.sm, // Margem inferior pequena
  },
  bodyText: {
    fontSize: fontSize.base, // Tamanho da fonte para texto normal
    color: colors.gray[700], // Cor do texto (cinza)
    lineHeight: 24, // Altura da linha para melhorar a legibilidade
  },
  smallText: {
    fontSize: fontSize.sm, // Tamanho pequeno para texto secundário
    color: colors.gray[600], // Cor do texto (cinza)
  },
  errorText: {
    fontSize: fontSize.sm, // Tamanho da fonte para texto de erro
    color: colors.red[500], // Cor do texto de erro (vermelho)
    marginTop: spacing.xs, // Margem superior pequena
  },
  
  // Layouts
  row: {
    flexDirection: 'row', // Organiza os itens em linha
    alignItems: 'center', // Alinha os itens verticalmente no centro
  },
  rowBetween: {
    flexDirection: 'row', // Organiza os itens em linha
    justifyContent: 'space-between', // Espaçamento entre os itens
    alignItems: 'center', // Alinha os itens verticalmente no centro
  },
  column: {
    flexDirection: 'column', // Organiza os itens em coluna
  },
  
  // Spacing
  mb1: { marginBottom: spacing.xs }, // Margem inferior pequena
  mb2: { marginBottom: spacing.sm }, // Margem inferior média
  mb3: { marginBottom: spacing.md }, // Margem inferior grande
  mb4: { marginBottom: spacing.lg }, // Margem inferior extra grande
  mb6: { marginBottom: spacing.xl }, // Margem inferior muito grande
  
  mt1: { marginTop: spacing.xs }, // Margem superior pequena
  mt2: { marginTop: spacing.sm }, // Margem superior média
  mt3: { marginTop: spacing.md }, // Margem superior grande
  mt4: { marginTop: spacing.lg }, // Margem superior extra grande
  mt6: { marginTop: spacing.xl }, // Margem superior muito grande
  
  p2: { padding: spacing.sm }, // Preenchimento pequeno
  p3: { padding: spacing.md }, // Preenchimento médio
  p4: { padding: spacing.lg }, // Preenchimento grande
  p6: { padding: spacing.xl }, // Preenchimento muito grande
  
  // Shadows
  shadow: {
    shadowColor: colors.black, // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 3, // Elevação para Android (sombra)
  },
  shadowLg: {
    shadowColor: colors.black, // Cor da sombra
    shadowOffset: { width: 0, height: 4 }, // Deslocamento maior para sombra
    shadowOpacity: 0.15, // Opacidade maior para sombra
    shadowRadius: 12, // Raio maior da sombra
    elevation: 8, // Maior elevação para Android (sombra)
  },
});