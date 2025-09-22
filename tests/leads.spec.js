// @ts-check
import { test, expect } from '@playwright/test'

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    await page.getByPlaceholder('Seu nome completo').fill('Gustavo Henrique')
    await page.getByPlaceholder('Seu email principal').fill('gushenriquet@gmail.com')
    await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
    await expect(page.locator('.toast')).toHaveText(message)

    await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
})

test('não deve cadastrar um lead com e-mail inválido', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    await page.getByPlaceholder('Seu nome completo').fill('Gustavo Henrique')
    await page.getByPlaceholder('Seu email principal').fill('gustavo.com.br')
    await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    await expect(page.locator('.alert')).toHaveText('Email incorreto')
})

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    await page.getByPlaceholder('Seu email principal').fill('gushenriquet@gmail.com')
    await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando o e-mail não é preenchido', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    await page.getByPlaceholder('Seu nome completo').fill('Gustavo Henrique')
    await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('não deve cadastrar um lead quando nenhum campo obrigatório é preenchido', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')

    await page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
