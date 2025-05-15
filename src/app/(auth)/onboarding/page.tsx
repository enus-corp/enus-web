'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingContainer, Form, Title, FormGroup, Label, Input, Select, Button, Snackbar } from './styles';
import { setUser } from '@/store/slices/userSlice';
import { useRootAppDispatch } from '@/hooks/useAppDispatch';
import clientApi from '@/services/clientApi';
import { User } from '@/types/user';

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
            console.log('Onboarding - Updating user profile...');
            const response = await clientApi.put<User>('/api/user/update', formData);
            
            if (response.error) {
                throw new Error(response.message || 'Failed to update profile');
            }

            if (!response.data) {
                throw new Error('No data received from server');
            }

            dispatch(setUser(response.data));
            setTimeout(() => router.replace('/chat'), 2000);
            showSnackbar("Profile updated successfully! Redirecting to chat...", false);
        } catch (error) {
            console.error("Error during user update: ", error);
            showSnackbar(error instanceof Error ? error.message : "Error updating profile. Please try again.", true);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                console.log('Onboarding - Fetching user data...');
                const response = await clientApi.get<User>('/api/user/self');
                
                if (response.error) {
                    throw new Error(response.message || 'Failed to fetch user data');
                }

                if (!response.data) {
                    throw new Error('No data received from server');
                }

                const user = response.data;
                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    gender: user.gender === null ? 'male' : user.gender,
                    age: user.age,
                });
            } catch (error) {
                console.error("Error during user fetch: ", error);
                showSnackbar(error instanceof Error ? error.message : "Error fetching user data", true);
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