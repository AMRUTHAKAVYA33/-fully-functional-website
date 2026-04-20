package com.taskapp.backend.service;

import com.taskapp.backend.dto.AuthRequest;
import com.taskapp.backend.dto.AuthResponse;
import com.taskapp.backend.dto.RegisterRequest;
import com.taskapp.backend.dto.UserResponse;
import com.taskapp.backend.entity.UserAccount;
import com.taskapp.backend.repository.UserRepository;
import com.taskapp.backend.security.AppUserDetails;
import com.taskapp.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        UserAccount user = new UserAccount();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserAccount savedUser = userRepository.save(user);
        AppUserDetails userDetails = new AppUserDetails(savedUser);
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token, toUserResponse(savedUser));
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail().trim().toLowerCase(), request.getPassword())
        );

        UserAccount user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        String token = jwtService.generateToken(new AppUserDetails(user));
        return new AuthResponse(token, toUserResponse(user));
    }

    private UserResponse toUserResponse(UserAccount user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}
