import { Router } from 'express';
import { SineteController } from '../controllers/SineteController.js';

const router = Router();

/**
 * @swagger
 * /api/sinetes:
 *   get:
 *     summary: Lista todos os sinetes
 *     tags: [Sinetes]
 *     responses:
 *       200:
 *         description: Lista de sinetes retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', SineteController.index);

/**
 * @swagger
 * /api/sinetes/{id}:
 *   get:
 *     summary: Busca um sinete pelo ID
 *     tags: [Sinetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do sinete
 *     responses:
 *       200:
 *         description: Sinete encontrado com sucesso.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Sinete não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', SineteController.show);

/**
 * @swagger
 * /api/sinetes:
 *   post:
 *     summary: Cadastra um novo sinete
 *     tags: [Sinetes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SineteInput'
 *     responses:
 *       201:
 *         description: Sinete cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', SineteController.create);

/**
 * @swagger
 * /api/sinetes/{id}:
 *   put:
 *     summary: Atualiza um sinete
 *     tags: [Sinetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do sinete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SineteInput'
 *     responses:
 *       200:
 *         description: Sinete atualizado com sucesso.
 *       400:
 *         description: ID ou dados inválidos.
 *       404:
 *         description: Sinete não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/:id', SineteController.update);

/**
 * @swagger
 * /api/sinetes/{id}:
 *   delete:
 *     summary: Exclui um sinete
 *     tags: [Sinetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do sinete
 *     responses:
 *       204:
 *         description: Sinete excluído com sucesso.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Sinete não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', SineteController.delete);

export default router;