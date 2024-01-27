import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Donut = () => {
    const percentage = 35;
    const radius = 40;
    const strokeWidth = 10;
    const duration = 500;
    const color = 'tomato';

    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;

    const animatedValue = useRef(new Animated.Value(0)).current;
    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circleCircumference, 0],
    });

    useEffect(() => {
        const animation = Animated.timing(animatedValue, {
            toValue: percentage,
            duration,
            useNativeDriver: true,
        });
        animation.start();
    }, [percentage, animatedValue, duration]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                <G rotation="-90" origin={`${halfCircle},${halfCircle}`}>
                    <Circle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
};

export default Donut;
