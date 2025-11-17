import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { login, register } from '../../services/auth';
import { AppLogo } from '../../components/ui/AppLogo';

type Props = {
  onLoginSuccess: () => void;
};

const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cadastro
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [tipoCadastro, setTipoCadastro] = useState<'atleta' | 'tecnico'>('atleta');
  const [cadastroLoading, setCadastroLoading] = useState(false);
  const [cadastroError, setCadastroError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !senha) {
      setError('Informe e‑mail e senha.');
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('E‑mail inválido.');
      return;
    }
    setLoading(true);
    try {
      const { token } = await login(normalizedEmail, senha);
      if (token) {
        onLoginSuccess();
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setError('Credenciais inválidas.');
      } else if (e?.code === 'ERR_NETWORK') {
        setError('Servidor indisponível. Verifique se o backend está rodando na porta 3001.');
      } else {
        setError('Falha no login: ' + (e?.response?.data?.message ?? 'Tente novamente.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setCadastroError(null);
    setCadastroLoading(true);
    try {
      if (!nomeCadastro.trim()) {
        setCadastroError('Informe seu nome.');
        return;
      }
      if (!emailCadastro.trim()) {
        setCadastroError('Informe seu e‑mail.');
        return;
      }
      if (!senhaCadastro) {
        setCadastroError('Informe sua senha.');
        return;
      }
      await register({
        nome: nomeCadastro.trim(),
        email: emailCadastro.trim().toLowerCase(),
        senha: senhaCadastro,
        tipo: tipoCadastro,
      });
      const { token } = await login(emailCadastro.trim().toLowerCase(), senhaCadastro);
      if (token) {
        onLoginSuccess();
      } else {
        setCadastroError('Cadastro realizado, mas o login falhou. Tente entrar manualmente.');
      }
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setCadastroError('E‑mail já cadastrado.');
      } else if (e?.response?.status === 400) {
        setCadastroError(e?.response?.data?.message ?? 'Dados inválidos.');
      } else if (e?.code === 'ERR_NETWORK') {
        setCadastroError('Servidor indisponível. Verifique se o backend está rodando na porta 3001.');
      } else {
        setCadastroError('Falha ao criar conta: ' + (e?.response?.data?.message ?? 'Tente novamente.'));
      }
    } finally {
      setCadastroLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppLogo size={150} style={{ alignSelf: 'center', marginBottom: 32 }} />

      {!modoCadastro && (
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.formGroup}>
              <Label>E-mail</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="voce@exemplo.com"
              />
            </View>
            <View style={styles.formGroup}>
              <Label>Senha</Label>
              <Input
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholder="Sua senha"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
              title={loading ? 'Autenticando...' : 'Entrar'}
              onPress={handleLogin}
              disabled={loading}
            />

            <Button
              title="Não tem conta? Criar"
              variant="outline"
              onPress={() => {
                setModoCadastro(true);
                setError(null);
                setEmail('');
                setSenha('');
              }}
              style={{ borderWidth: 0 }}
            />
          </CardContent>
        </Card>
      )}

      {modoCadastro && (
        <Card>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.formGroup}>
              <Label>Nome</Label>
              <Input
                value={nomeCadastro}
                onChangeText={setNomeCadastro}
                placeholder="Seu nome"
              />
            </View>

            <View style={styles.formGroup}>
              <Label>E-mail</Label>
              <Input
                value={emailCadastro}
                onChangeText={setEmailCadastro}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="voce@exemplo.com"
              />
            </View>

            <View style={styles.formGroup}>
              <Label>Senha</Label>
              <Input
                value={senhaCadastro}
                onChangeText={setSenhaCadastro}
                secureTextEntry
                placeholder="Crie uma senha"
              />
            </View>

            <View style={styles.formGroup}>
              <Label>Tipo</Label>
              <View style={styles.tipoRow}>
                <Button
                  title={tipoCadastro === 'atleta' ? 'Atleta ✓' : 'Atleta'}
                  variant={tipoCadastro === 'atleta' ? 'default' : 'outline'}
                  onPress={() => setTipoCadastro('atleta')}
                />
                <Button
                  title={tipoCadastro === 'tecnico' ? 'Técnico ✓' : 'Técnico'}
                  variant={tipoCadastro === 'tecnico' ? 'default' : 'outline'}
                  onPress={() => setTipoCadastro('tecnico')}
                  style={styles.tipoButtonRight}
                />
              </View>
            </View>

            {cadastroError && <Text style={styles.errorText}>{cadastroError}</Text>}

            <Button
              title={cadastroLoading ? 'Criando...' : 'Criar conta'}
              onPress={handleRegister}
              disabled={cadastroLoading}
              iconName="user-plus"
            />

            <Button
              title="Já tenho conta"
              variant="outline"
              onPress={() => {
                setModoCadastro(false);
                setCadastroError(null);
                setNomeCadastro('');
                setEmailCadastro('');
                setSenhaCadastro('');
              }}
              style={{ borderWidth: 0 }}
            />
          </CardContent>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
    justifyContent: 'center',
  },
  cardContent: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  errorText: {
    color: '#ef4444',
  },
  tipoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipoButtonRight: {
    marginLeft: 8,
  },
});

export default LoginScreen;