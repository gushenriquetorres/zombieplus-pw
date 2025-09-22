// @ts-nocheck
import { test } from '@playwright/test'
import { LandingPage } from './pages/LandingPage'

let landingPage

test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Gustavo Henrique', 'gushenriquet@gmail.com')

    const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
    await landingPage.toastHaveText(message)
})

test('não deve cadastrar um lead com e-mail inválido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Gustavo Henrique', 'gustavo.com.br')

    await landingPage.alertHaveText('Email incorreto')
})

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', 'gushenriquet@gmail.com')

    await landingPage.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando o e-mail não é preenchido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('Gustavo Henrique', '')

    await landingPage.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando nenhum campo obrigatório é preenchido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', '')

    await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
