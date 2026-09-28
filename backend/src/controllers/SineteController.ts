import { Request, Response } from 'express';
import Sinete from '../models/Sinete.js';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro desconhecido.';
};

export class SineteController {
  // GET /api/sinetes - Lista todos os sinetes
  public static async index(_req: Request, res: Response): Promise<Response> {
    try {
      const sinetes = await Sinete.findAll();

      return res.status(200).json(sinetes);
    } catch (error: unknown) {
      return res.status(500).json({
        erro: 'Erro ao listar sinetes',
        detalhe: getErrorMessage(error),
      });
    }
  }

  // GET /api/sinetes/:id - Busca um sinete por ID
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const sinete = await Sinete.findByPk(id);

      if (!sinete) {
        return res.status(404).json({
          erro: 'Sinete não encontrado.',
        });
      }

      return res.status(200).json(sinete);
    } catch (error: unknown) {
      return res.status(500).json({
        erro: 'Erro ao buscar sinete',
        detalhe: getErrorMessage(error),
      });
    }
  }

  // POST /api/sinetes - Cadastra um novo sinete
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, descricao, categoria, nivelPerigo, raro } = req.body;

      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({
          erro: 'O campo nome é obrigatório.',
        });
      }

      if (
        !descricao ||
        typeof descricao !== 'string' ||
        descricao.trim() === ''
      ) {
        return res.status(400).json({
          erro: 'O campo descrição é obrigatório.',
        });
      }

      if (
        !categoria ||
        typeof categoria !== 'string' ||
        categoria.trim() === ''
      ) {
        return res.status(400).json({
          erro: 'O campo categoria é obrigatório.',
        });
      }

      if (
        nivelPerigo === undefined ||
        typeof nivelPerigo !== 'number' ||
        !Number.isInteger(nivelPerigo) ||
        nivelPerigo < 1 ||
        nivelPerigo > 5
      ) {
        return res.status(400).json({
          erro: 'O nivelPerigo deve ser um número inteiro entre 1 e 5.',
        });
      }

      if (typeof raro !== 'boolean') {
        return res.status(400).json({
          erro: 'O campo raro deve ser verdadeiro ou falso.',
        });
      }

      const novoSinete = await Sinete.create({
        nome: nome.trim(),
        descricao: descricao.trim(),
        categoria: categoria.trim(),
        nivelPerigo,
        raro,
      });

      return res.status(201).json(novoSinete);
    } catch (error: unknown) {
      return res.status(500).json({
        erro: 'Erro ao cadastrar sinete',
        detalhe: getErrorMessage(error),
      });
    }
  }

  // PUT /api/sinetes/:id - Atualiza um sinete existente
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const sinete = await Sinete.findByPk(id);

      if (!sinete) {
        return res.status(404).json({
          erro: 'Sinete não encontrado.',
        });
      }

      const { nome, descricao, categoria, nivelPerigo, raro } = req.body;

      if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === '') {
          return res.status(400).json({
            erro: 'O campo nome deve ser um texto válido.',
          });
        }

        sinete.nome = nome.trim();
      }

      if (descricao !== undefined) {
        if (typeof descricao !== 'string' || descricao.trim() === '') {
          return res.status(400).json({
            erro: 'O campo descrição deve ser um texto válido.',
          });
        }

        sinete.descricao = descricao.trim();
      }

      if (categoria !== undefined) {
        if (typeof categoria !== 'string' || categoria.trim() === '') {
          return res.status(400).json({
            erro: 'O campo categoria deve ser um texto válido.',
          });
        }

        sinete.categoria = categoria.trim();
      }

      if (nivelPerigo !== undefined) {
        if (
          typeof nivelPerigo !== 'number' ||
          !Number.isInteger(nivelPerigo) ||
          nivelPerigo < 1 ||
          nivelPerigo > 5
        ) {
          return res.status(400).json({
            erro: 'O nivelPerigo deve ser um número inteiro entre 1 e 5.',
          });
        }

        sinete.nivelPerigo = nivelPerigo;
      }

      if (raro !== undefined) {
        if (typeof raro !== 'boolean') {
          return res.status(400).json({
            erro: 'O campo raro deve ser verdadeiro ou falso.',
          });
        }

        sinete.raro = raro;
      }

      await sinete.save();

      return res.status(200).json(sinete);
    } catch (error: unknown) {
      return res.status(500).json({
        erro: 'Erro ao atualizar sinete',
        detalhe: getErrorMessage(error),
      });
    }
  }

  // DELETE /api/sinetes/:id - Remove um sinete
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const sinete = await Sinete.findByPk(id);

      if (!sinete) {
        return res.status(404).json({
          erro: 'Sinete não encontrado.',
        });
      }

      await sinete.destroy();

      return res.status(204).send();
    } catch (error: unknown) {
      return res.status(500).json({
        erro: 'Erro ao excluir sinete',
        detalhe: getErrorMessage(error),
      });
    }
  }
}
