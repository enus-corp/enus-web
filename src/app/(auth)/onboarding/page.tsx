'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingContainer, Form, Title, FormGroup, Label, Input, Select, Button, Snackbar } from './styles';
import { self, update } from '@/services/user';
import { setUser } from '@/store/slices/userSlice';
import { useRootAppDispatch } from '@/hooks/useAppDispatch';
interface UserFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    age: number;
}

export default function OnboardingPage() {
    const dispatch = useRootAppDispatch();
    const router = useRouter();
    const [snackbar, setSnackbar] = useState<{ message: string; isError: boolean } | null>(null);

    const showSnackbar = (message: string, isError: boolean) => {
        setSnackbar({ message, isError });
        setTimeout(() => setSnackbar(null), 3000);
    };

    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: 'male',
        age: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await update(formData)
            dispatch(setUser(user));
            setTimeout(() => router.replace('/chat'), 2000);
            showSnackbar("Profile updated successfully! Redirecting to chat...", false);
        } catch (error) {
            console.error("Error during user update: ", error);
            showSnackbar("Error updating profile. Please try again.", true);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await self();
                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    gender: user.gender === null ? 'male' : user.gender,
                    age: user.age,
                })
            } catch (error) {
                console.error("Error during user fetch: ", error);
                showSnackbar("Error fetching user from server", true);
            }
        }

        getUser();
    }, []);

    return (
        <OnboardingContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Complete Your Profile</Title>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="age">Age</Label>
                    <Input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        required
                    />
                </FormGroup>
                <Button type="submit">
                    Complete Profile
                </Button>
            </Form>
            {snackbar && (
                <Snackbar isError={snackbar.isError}>
                    {snackbar.message}
                </Snackbar>
            )}
        </OnboardingContainer>
    );
} 